// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initModal();
    initFormHandling();
    initPerformanceChart();
    initScrollEffects();
    initITSupportButtons();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Dropdown functionality for mobile
    if (dropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            // Only toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
            }
        });
        // Close dropdown when clicking outside (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !dropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
        // Reset dropdown on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                dropdownMenu.style.display = '';
            } else {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function (for hero buttons)
function scrollToSection(sectionId) {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('sopModal');
    const closeBtn = document.querySelector('.close');
    const modalContent = document.getElementById('modalContent');

    // Close modal when clicking on X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Open modal with SOP details
function openModal(sopType) {
    const modal = document.getElementById('sopModal');
    const modalContent = document.getElementById('modalContent');
    
    const sopDetails = {
        'ticket-sop': {
            title: 'Ticket Management SOP',
            content: `
                <h2>Ticket Management Standard Operating Procedure</h2>
                <div class="sop-details">
                    <h3>1. Ticket Creation</h3>
                    <ul>
                        <li>All support requests must be logged as tickets</li>
                        <li>Include user details, issue description, and priority level</li>
                        <li>Assign unique ticket number for tracking</li>
                        <li>Set appropriate SLA based on priority</li>
                    </ul>
                    
                    <h3>2. Ticket Categorization</h3>
                    <ul>
                        <li>Hardware Issues: Physical equipment problems</li>
                        <li>Software Issues: Application and system problems</li>
                        <li>Network Issues: Connectivity and infrastructure problems</li>
                        <li>Security Issues: Access and security-related problems</li>
                    </ul>
                    
                    <h3>3. Priority Assignment</h3>
                    <ul>
                        <li><strong>Critical:</strong> System down, business impact</li>
                        <li><strong>High:</strong> Major functionality affected</li>
                        <li><strong>Medium:</strong> Minor functionality affected</li>
                        <li><strong>Low:</strong> General inquiries, enhancements</li>
                    </ul>
                    
                    <h3>4. Ticket Updates</h3>
                    <ul>
                        <li>Regular status updates every 2 hours</li>
                        <li>Document all actions taken</li>
                        <li>Update resolution time and steps</li>
                        <li>Obtain user confirmation before closure</li>
                    </ul>
                </div>
            `
        },
        'security-sop': {
            title: 'Security Protocols SOP',
            content: `
                <h2>Security Protocols Standard Operating Procedure</h2>
                <div class="sop-details">
                    <h3>1. Incident Response</h3>
                    <ul>
                        <li>Immediate isolation of affected systems</li>
                        <li>Documentation of incident details</li>
                        <li>Notification to security team within 15 minutes</li>
                        <li>Assessment of impact and scope</li>
                    </ul>
                    
                    <h3>2. Access Management</h3>
                    <ul>
                        <li>Regular review of user access rights</li>
                        <li>Immediate revocation of terminated employee access</li>
                        <li>Multi-factor authentication for sensitive systems</li>
                        <li>Password policy enforcement</li>
                    </ul>
                    
                    <h3>3. Data Protection</h3>
                    <ul>
                        <li>Encryption of sensitive data at rest and in transit</li>
                        <li>Regular backup verification and testing</li>
                        <li>Secure disposal of old equipment and data</li>
                        <li>Compliance with data protection regulations</li>
                    </ul>
                    
                    <h3>4. Security Monitoring</h3>
                    <ul>
                        <li>24/7 monitoring of security events</li>
                        <li>Regular security assessments and audits</li>
                        <li>Threat intelligence integration</li>
                        <li>Incident reporting and documentation</li>
                    </ul>
                </div>
            `
        },
        'network-sop': {
            title: 'Network Support SOP',
            content: `
                <h2>Network Support Standard Operating Procedure</h2>
                <div class="sop-details">
                    <h3>1. Network Monitoring</h3>
                    <ul>
                        <li>Continuous monitoring of network performance</li>
                        <li>Alert configuration for critical thresholds</li>
                        <li>Regular capacity planning and analysis</li>
                        <li>Network topology documentation</li>
                    </ul>
                    
                    <h3>2. Troubleshooting Process</h3>
                    <ul>
                        <li>Identify affected network segments</li>
                        <li>Check physical connections and hardware</li>
                        <li>Verify configuration and settings</li>
                        <li>Test connectivity and performance</li>
                    </ul>
                    
                    <h3>3. Maintenance Procedures</h3>
                    <ul>
                        <li>Scheduled maintenance windows</li>
                        <li>Backup configuration before changes</li>
                        <li>Rollback procedures for failed changes</li>
                        <li>Documentation of all network changes</li>
                    </ul>
                    
                    <h3>4. Emergency Response</h3>
                    <ul>
                        <li>Immediate response to network outages</li>
                        <li>Communication with affected users</li>
                        <li>Escalation procedures for complex issues</li>
                        <li>Post-incident analysis and reporting</li>
                    </ul>
                </div>
            `
        },
        'data-sop': {
            title: 'Data Management SOP',
            content: `
                <h2>Data Management Standard Operating Procedure</h2>
                <div class="sop-details">
                    <h3>1. Backup Procedures</h3>
                    <ul>
                        <li>Daily automated backups of critical data</li>
                        <li>Weekly full system backups</li>
                        <li>Monthly backup restoration testing</li>
                        <li>Off-site backup storage for disaster recovery</li>
                    </ul>
                    
                    <h3>2. Data Recovery</h3>
                    <ul>
                        <li>Assessment of data loss impact</li>
                        <li>Identification of recovery point objective</li>
                        <li>Execution of recovery procedures</li>
                        <li>Verification of recovered data integrity</li>
                    </ul>
                    
                    <h3>3. Data Retention</h3>
                    <ul>
                        <li>Compliance with regulatory requirements</li>
                        <li>Regular review of data retention policies</li>
                        <li>Secure deletion of expired data</li>
                        <li>Documentation of retention schedules</li>
                    </ul>
                    
                    <h3>4. Data Security</h3>
                    <ul>
                        <li>Access controls and permissions</li>
                        <li>Encryption of sensitive data</li>
                        <li>Regular security audits</li>
                        <li>Incident response for data breaches</li>
                    </ul>
                </div>
            `
        }
    };

    if (sopDetails[sopType]) {
        modalContent.innerHTML = sopDetails[sopType].content;
        modal.style.display = 'block';
    }
}

// Form handling
function initFormHandling() {
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const ticketData = {
                name: formData.get('name'),
                email: formData.get('email'),
                priority: formData.get('priority'),
                category: formData.get('category'),
                description: formData.get('description'),
                timestamp: new Date().toISOString(),
                ticketId: generateTicketId()
            };
            
            // Simulate form submission
            showTicketConfirmation(ticketData);
            
            // Reset form
            this.reset();
        });
    }
}

// Generate unique ticket ID
function generateTicketId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5);
    return `TC-${timestamp.slice(-6)}-${random.toUpperCase()}`;
}

// Show ticket confirmation
function showTicketConfirmation(ticketData) {
    const modal = document.getElementById('sopModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="ticket-confirmation">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Ticket Submitted Successfully!</h2>
            <div class="ticket-details">
                <p><strong>Ticket ID:</strong> ${ticketData.ticketId}</p>
                <p><strong>Name:</strong> ${ticketData.name}</p>
                <p><strong>Priority:</strong> ${ticketData.priority}</p>
                <p><strong>Category:</strong> ${ticketData.category}</p>
                <p><strong>Submitted:</strong> ${new Date(ticketData.timestamp).toLocaleString()}</p>
            </div>
            <div class="confirmation-message">
                <p>Your support ticket has been created and assigned to our technical team. You will receive an email confirmation shortly with further instructions.</p>
                <p><strong>Expected Response Time:</strong> ${getResponseTime(ticketData.priority)}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Get response time based on priority
function getResponseTime(priority) {
    const responseTimes = {
        'critical': '15 minutes',
        'high': '30 minutes',
        'medium': '2 hours',
        'low': '4 hours'
    };
    return responseTimes[priority] || '2 hours';
}

// Performance chart
function initPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Sample data for the last 6 months
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'First Response SLA (%)',
                data: [96.5, 97.2, 98.1, 98.5, 98.8, 98.5],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Resolution SLA (%)',
                data: [89.2, 91.5, 92.8, 93.5, 94.0, 94.2],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Customer Satisfaction',
                data: [4.2, 4.4, 4.5, 4.6, 4.7, 4.8],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Performance Metrics - Last 6 Months'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 85,
                    max: 100,
                    title: {
                        display: true,
                        text: 'SLA Percentage (%)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 3.5,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Satisfaction Score'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            }
        }
    };
    
    // Create chart if Chart.js is available
    if (typeof Chart !== 'undefined') {
        new Chart(ctx, config);
    } else {
        // Fallback: Create a simple canvas representation
        createSimpleChart(ctx, data);
    }
}

// Simple chart fallback
function createSimpleChart(ctx, data) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Performance Metrics - Last 6 Months', width / 2, 20);
    
    // Draw legend
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    const labels = ['First Response SLA', 'Resolution SLA', 'Customer Satisfaction'];
    
    labels.forEach((label, i) => {
        ctx.fillStyle = colors[i];
        ctx.fillRect(20, 40 + i * 20, 15, 10);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(label, 45, 50 + i * 20);
    });
    
    // Draw chart area
    ctx.strokeStyle = '#e5e7eb';
    ctx.strokeRect(padding, 100, width - 2 * padding, height - 140);
    
    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    for (let i = 1; i < 5; i++) {
        const y = 100 + (height - 140) * i / 5;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
}

// Scroll effects
function initScrollEffects() {
    // Intersection Observer for fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.sop-card, .metric-card, .timeline-item, .process-step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Show IT support section on button click
function initITSupportButtons() {
    const buttons = document.querySelectorAll('.it-support-btn');
    const sections = document.querySelectorAll('.it-support-section');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.style.display = 'block';
                    setTimeout(() => {
                        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                } else {
                    sec.style.display = 'none';
                }
            });
        });
    });
}

// Add some CSS for the modal content
const style = document.createElement('style');
style.textContent = `
    .sop-details h3 {
        color: #1f2937;
        margin: 1.5rem 0 0.5rem 0;
        font-size: 1.1rem;
    }
    
    .sop-details ul {
        margin: 0.5rem 0 1rem 1.5rem;
        color: #6b7280;
    }
    
    .sop-details li {
        margin-bottom: 0.25rem;
    }
    
    .ticket-confirmation {
        text-align: center;
    }
    
    .confirmation-icon {
        font-size: 4rem;
        color: #10b981;
        margin-bottom: 1rem;
    }
    
    .ticket-details {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1.5rem 0;
        text-align: left;
    }
    
    .ticket-details p {
        margin-bottom: 0.5rem;
        color: #374151;
    }
    
    .confirmation-message {
        color: #6b7280;
        line-height: 1.6;
    }
    
    .confirmation-message strong {
        color: #1f2937;
    }
`;
document.head.appendChild(style); 