import { logger } from "@/utils/logger";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const startTime = Date.now();

    try {
      // Default headers
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      // Add auth token if available
      const token = localStorage.getItem("token");
      if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
      }

      // Log request start
      logger.info(`API Request: ${options.method || "GET"} ${endpoint}`, {
        url,
        method: options.method || "GET",
        headers: defaultHeaders,
        body: options.body ? JSON.parse(options.body as string) : undefined,
      });

      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      const responseTime = Date.now() - startTime;
      const responseData = await response.json();

      // Log API call
      logger.logApiCall(
        options.method || "GET",
        endpoint,
        response.status,
        responseTime,
        {
          success: response.ok,
          responseData: responseData,
        }
      );

      if (!response.ok) {
        const error = new Error(responseData.message || "API request failed");
        logger.error("API Request Failed", {
          url,
          method: options.method || "GET",
          status: response.status,
          statusText: response.statusText,
          responseTime,
          error: responseData,
        });
        throw error;
      }

      return responseData;
    } catch (error) {
      const responseTime = Date.now() - startTime;

      logger.error("API Request Error", {
        url,
        method: options.method || "GET",
        responseTime,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // File upload
  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: any
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    const startTime = Date.now();

    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      logger.info(`File Upload: ${endpoint}`, {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        additionalData,
      });

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
      });

      const responseTime = Date.now() - startTime;
      const responseData = await response.json();

      logger.logApiCall("POST", endpoint, response.status, responseTime, {
        type: "file_upload",
        fileName: file.name,
        fileSize: file.size,
        success: response.ok,
      });

      if (!response.ok) {
        const error = new Error(responseData.message || "File upload failed");
        logger.error("File Upload Failed", {
          endpoint,
          fileName: file.name,
          status: response.status,
          responseTime,
          error: responseData,
        });
        throw error;
      }

      return responseData;
    } catch (error) {
      const responseTime = Date.now() - startTime;

      logger.error("File Upload Error", {
        endpoint,
        fileName: file.name,
        responseTime,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    try {
      const response = await this.get("/health");
      logger.info("Health Check Successful", response.data);
      return response;
    } catch (error) {
      logger.error("Health Check Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }

  // Batch requests
  async batch<T>(
    requests: Array<{
      endpoint: string;
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      data?: any;
    }>
  ): Promise<ApiResponse<T[]>> {
    const startTime = Date.now();

    try {
      logger.info("Batch API Request Started", {
        requestCount: requests.length,
        requests: requests.map((r) => ({
          method: r.method,
          endpoint: r.endpoint,
        })),
      });

      const promises = requests.map((req) => {
        switch (req.method) {
          case "GET":
            return this.get(req.endpoint);
          case "POST":
            return this.post(req.endpoint, req.data);
          case "PUT":
            return this.put(req.endpoint, req.data);
          case "DELETE":
            return this.delete(req.endpoint);
          case "PATCH":
            return this.patch(req.endpoint, req.data);
          default:
            throw new Error(`Unsupported method: ${req.method}`);
        }
      });

      const results = await Promise.allSettled(promises);
      const responseTime = Date.now() - startTime;

      const successCount = results.filter(
        (r) => r.status === "fulfilled"
      ).length;
      const failureCount = results.filter(
        (r) => r.status === "rejected"
      ).length;

      logger.info("Batch API Request Completed", {
        totalRequests: requests.length,
        successCount,
        failureCount,
        responseTime,
      });

      return {
        success: failureCount === 0,
        data: results.map((r) =>
          r.status === "fulfilled" ? r.value : null
        ) as T[],
        message: `Batch completed: ${successCount} success, ${failureCount} failed`,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      logger.error("Batch API Request Error", {
        requestCount: requests.length,
        responseTime,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw error;
    }
  }

  // Retry mechanism
  async retryRequest<T>(
    requestFn: () => Promise<ApiResponse<T>>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<ApiResponse<T>> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.debug(`API Retry Attempt ${attempt}/${maxRetries}`);
        const result = await requestFn();

        if (attempt > 1) {
          logger.info(`API Retry Successful on attempt ${attempt}`);
        }

        return result;
      } catch (error) {
        lastError = error as Error;

        logger.warn(`API Retry Failed on attempt ${attempt}`, {
          attempt,
          maxRetries,
          error: lastError.message,
          nextRetryDelay:
            attempt < maxRetries ? delay * attempt : "no more retries",
        });

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
      }
    }

    logger.error("API Retry Exhausted", {
      maxRetries,
      finalError: lastError.message,
    });

    throw lastError;
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Export specific methods for convenience
export const {
  get,
  post,
  put,
  delete: del,
  patch,
  uploadFile,
  healthCheck,
  batch,
  retryRequest,
} = apiService;

export default apiService;
