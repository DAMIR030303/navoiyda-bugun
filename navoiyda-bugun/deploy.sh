#!/bin/bash

# 🚀 Navoiyda Bugun - Production Deployment Script
# This script handles the complete deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="navoiyda-bugun"
DOCKER_IMAGE="navoiyda-bugun:latest"
BACKUP_DIR="./backups"
LOG_FILE="./logs/deploy.log"

# Functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" | tee -a "$LOG_FILE"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a "$LOG_FILE"
}

# Create necessary directories
mkdir -p logs backups uploads

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker and try again."
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    error "docker-compose is not installed. Please install it and try again."
fi

log "🚀 Starting Navoiyda Bugun deployment..."

# Step 1: Backup existing data (if any)
log "📦 Creating backup of existing data..."
if [ -d "mongo_data" ]; then
    cp -r mongo_data "$BACKUP_DIR/mongo_data_$(date +%Y%m%d_%H%M%S)"
    success "Database backup created"
fi

# Step 2: Pull latest changes from Git
log "📥 Pulling latest changes from Git..."
git pull origin master || warning "Git pull failed or no changes"

# Step 3: Build Docker images
log "🏗️ Building Docker images..."
docker-compose build --no-cache || error "Docker build failed"

# Step 4: Stop existing containers
log "🛑 Stopping existing containers..."
docker-compose down || warning "No containers to stop"

# Step 5: Start new containers
log "🚀 Starting new containers..."
docker-compose up -d || error "Failed to start containers"

# Step 6: Wait for services to be healthy
log "⏳ Waiting for services to be healthy..."
sleep 30

# Check if main application is healthy
if curl -f http://localhost:5001/api/health > /dev/null 2>&1; then
    success "Application is healthy and running"
else
    error "Application health check failed"
fi

# Step 7: Run database migrations (if any)
log "🗄️ Running database migrations..."
# Add migration commands here if needed

# Step 8: Clear old Docker images
log "🧹 Cleaning up old Docker images..."
docker system prune -f || warning "Docker cleanup failed"

# Step 9: Display deployment info
log "📊 Deployment Information:"
echo "=================================="
echo "🌐 Application: http://localhost:5001"
echo "📊 Grafana: http://localhost:3001"
echo "🔍 Prometheus: http://localhost:9090"
echo "🗄️ MongoDB: localhost:27017"
echo "🔴 Redis: localhost:6379"
echo "=================================="

# Step 10: Send deployment notification (optional)
log "📧 Sending deployment notification..."
# Add notification logic here (Slack, email, etc.)

success "🎉 Deployment completed successfully!"
log "📝 Deployment logs saved to: $LOG_FILE"

# Display running containers
echo ""
log "🐳 Running containers:"
docker-compose ps 