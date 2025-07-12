import {
  User,
  UserRole,
  Task,
  TaskStatus,
  TaskPriority,
  Attendance,
  AttendanceStatus,
  Project,
  ProjectStatus,
  ProjectPriority,
} from "../types";

// Mock database
export class MockDatabase {
  private users: User[] = [
    {
      id: "1",
      username: "founder",
      email: "founder@navoiyda.uz",
      firstName: "Asoschi",
      lastName: "Rahbar",
      role: UserRole.FOUNDER,
      department: "Boshqaruv",
      position: "Asoschi",
      employeeId: "EMP001",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      username: "ceo",
      email: "ceo@navoiyda.uz",
      firstName: "Boshqaruv",
      lastName: "Direktori",
      role: UserRole.CEO,
      department: "Boshqaruv",
      position: "CEO",
      employeeId: "EMP002",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      username: "hr",
      email: "hr@navoiyda.uz",
      firstName: "HR",
      lastName: "Menejer",
      role: UserRole.HR_MANAGER,
      department: "HR",
      position: "HR Manager",
      employeeId: "EMP003",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      username: "project",
      email: "project@navoiyda.uz",
      firstName: "Loyiha",
      lastName: "Menejer",
      role: UserRole.PROJECT_MANAGER,
      department: "Loyihalar",
      position: "Project Manager",
      employeeId: "EMP004",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      username: "marketing",
      email: "marketing@navoiyda.uz",
      firstName: "Marketing",
      lastName: "Mutaxassisi",
      role: UserRole.MARKETING_MANAGER,
      department: "Marketing",
      position: "Marketing Manager",
      employeeId: "EMP005",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      username: "sales",
      email: "sales@navoiyda.uz",
      firstName: "Sotuv",
      lastName: "Menejer",
      role: UserRole.SALES_MANAGER,
      department: "Sotuv",
      position: "Sales Manager",
      employeeId: "EMP006",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "7",
      username: "mobilographer",
      email: "mobilographer@navoiyda.uz",
      firstName: "Mobilo",
      lastName: "Graf",
      role: UserRole.MOBILOGRAPHER,
      department: "Kontent",
      position: "Mobilographer",
      employeeId: "EMP007",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "8",
      username: "brandface",
      email: "brandface@navoiyda.uz",
      firstName: "Brend",
      lastName: "Yuzi",
      role: UserRole.BRAND_FACE,
      department: "Kontent",
      position: "Brand Face",
      employeeId: "EMP008",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "9",
      username: "screenwriter",
      email: "screenwriter@navoiyda.uz",
      firstName: "Ssenariy",
      lastName: "Yozuvchi",
      role: UserRole.SCREENWRITER,
      department: "Kontent",
      position: "Screenwriter",
      employeeId: "EMP009",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "10",
      username: "employee",
      email: "employee@navoiyda.uz",
      firstName: "Oddiy",
      lastName: "Xodim",
      role: UserRole.EMPLOYEE,
      department: "Umumiy",
      position: "Xodim",
      employeeId: "EMP010",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "11",
      username: "admin",
      email: "admin@navoiyda.uz",
      firstName: "Tizim",
      lastName: "Administrator",
      role: UserRole.ADMIN,
      department: "IT",
      position: "System Admin",
      employeeId: "EMP011",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private tasks: Task[] = [
    {
      id: "1",
      title: "Marketing kampaniyasi tayyorlash",
      description: "Yangi mahsulot uchun marketing kampaniyasi yaratish",
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      assignedTo: ["3"],
      assignedBy: "2",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["marketing", "kampaniya"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Hisobot tayyorlash",
      description: "Oylik hisobot tayyorlash va taqdim etish",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      assignedTo: ["4"],
      assignedBy: "2",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["hisobot", "oylik"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private attendance: Attendance[] = [
    {
      id: "1",
      userId: "1",
      date: new Date().toISOString().split("T")[0]!,
      checkIn: "09:00",
      checkOut: "18:00",
      status: AttendanceStatus.PRESENT,
      location: "Ofis",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "2",
      date: new Date().toISOString().split("T")[0]!,
      checkIn: "08:30",
      checkOut: "17:30",
      status: AttendanceStatus.PRESENT,
      location: "Ofis",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private projects: Project[] = [
    {
      id: "1",
      name: "Yangi veb-sayt loyihasi",
      description: "Kompaniya uchun zamonaviy veb-sayt yaratish",
      status: ProjectStatus.ACTIVE,
      priority: ProjectPriority.HIGH,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: ["3", "4"],
      manager: "2",
      budget: 50000000,
      progress: 65,
      tags: ["veb", "dizayn"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // User methods
  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const newUser: User = {
      ...userData,
      id: (this.users.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, userData: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    const currentUser = this.users[userIndex];
    const updatedUser = {
      ...currentUser,
      ...userData,
      id: currentUser.id,
      updatedAt: new Date().toISOString(),
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  // Task methods
  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksByUserId(userId: string): Task[] {
    return this.tasks.filter((task) => task.assignedTo.includes(userId));
  }

  createTask(taskData: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const newTask: Task = {
      ...taskData,
      id: (this.tasks.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, taskData: Partial<Task>): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return undefined;

    const currentTask = this.tasks[taskIndex];
    const updatedTask = {
      ...currentTask,
      ...taskData,
      id: currentTask.id,
      updatedAt: new Date().toISOString(),
    };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  // Attendance methods
  getAttendance(): Attendance[] {
    return this.attendance;
  }

  getAttendanceByUserId(userId: string): Attendance[] {
    return this.attendance.filter((att) => att.userId === userId);
  }

  createAttendance(
    attendanceData: Omit<Attendance, "id" | "createdAt" | "updatedAt">
  ): Attendance {
    const newAttendance: Attendance = {
      ...attendanceData,
      id: (this.attendance.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.attendance.push(newAttendance);
    return newAttendance;
  }

  // Project methods
  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  createProject(
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ): Project {
    const newProject: Project = {
      ...projectData,
      id: (this.projects.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  updateProject(
    id: string,
    projectData: Partial<Project>
  ): Project | undefined {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === id
    );
    if (projectIndex === -1) return undefined;

    const currentProject = this.projects[projectIndex];
    const updatedProject = {
      ...currentProject,
      ...projectData,
      id: currentProject.id,
      updatedAt: new Date().toISOString(),
    };
    this.projects[projectIndex] = updatedProject;
    return updatedProject;
  }
}

export const db = new MockDatabase();
