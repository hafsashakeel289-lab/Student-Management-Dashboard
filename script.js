/* ════════════════════════════════════════════════════════════════
   EduTrack — Student Management Dashboard
   script.js  ·  All functionality, clean & commented
   ════════════════════════════════════════════════════════════════ */

'use strict';

/* ── DEMO DATA ──────────────────────────────────────────────────── */
// Default students loaded on first visit (stored in localStorage)
const DEMO_STUDENTS = [
  {
    id: 'ET-1001', name: 'Sara Ahmed', age: 21, course: 'Computer Science',
    email: 'sara.ahmed@example.com', phone: '+92 300 1234567',
    address: 'Street 5, Block B, Faisalabad', status: 'Active',
    enrollDate: '2023-09-01',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sara&backgroundColor=b6e3f4'
  },
  {
    id: 'ET-1002', name: 'Ali Hassan', age: 23, course: 'Software Engineering',
    email: 'ali.hassan@example.com', phone: '+92 311 9876543',
    address: 'Model Town, Lahore', status: 'Active',
    enrollDate: '2023-09-01',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ali&backgroundColor=c0aede'
  },
  {
    id: 'ET-1003', name: 'Zara Khan', age: 22, course: 'Data Science',
    email: 'zara.khan@example.com', phone: '+92 321 5554444',
    address: 'Gulberg III, Lahore', status: 'Active',
    enrollDate: '2023-09-15',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Zara&backgroundColor=d1d4f9'
  },
  {
    id: 'ET-1004', name: 'Bilal Mirza', age: 24, course: 'Artificial Intelligence',
    email: 'bilal.mirza@example.com', phone: '+92 333 7771111',
    address: 'F-8, Islamabad', status: 'Inactive',
    enrollDate: '2022-02-10',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Bilal&backgroundColor=ffd5dc'
  },
  {
    id: 'ET-1005', name: 'Hina Qureshi', age: 20, course: 'Cybersecurity',
    email: 'hina.q@example.com', phone: '+92 345 2223333',
    address: 'DHA Phase 5, Karachi', status: 'Active',
    enrollDate: '2024-01-15',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Hina&backgroundColor=ffdfbf'
  },
  {
    id: 'ET-1006', name: 'Omar Farooq', age: 25, course: 'Business Administration',
    email: 'omar.f@example.com', phone: '+92 312 8889999',
    address: 'Saddar, Rawalpindi', status: 'On Leave',
    enrollDate: '2022-08-20',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Omar&backgroundColor=c0aede'
  },
  {
    id: 'ET-1007', name: 'Fatima Siddiqui', age: 21, course: 'Graphic Design',
    email: 'fatima.s@example.com', phone: '+92 300 6665555',
    address: 'Johar Town, Lahore', status: 'Active',
    enrollDate: '2024-02-01',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Fatima&backgroundColor=b6e3f4'
  },
  {
    id: 'ET-1008', name: 'Usman Tariq', age: 22, course: 'Mechanical Engineering',
    email: 'usman.t@example.com', phone: '+92 322 4443322',
    address: 'Clifton, Karachi', status: 'Active',
    enrollDate: '2023-10-05',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Usman&backgroundColor=d1d4f9'
  },
  {
    id: 'ET-1009', name: 'Ayesha Noor', age: 20, course: 'Psychology',
    email: 'ayesha.n@example.com', phone: '+92 340 1112222',
    address: 'G-11, Islamabad', status: 'Active',
    enrollDate: '2024-03-10',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ayesha&backgroundColor=ffd5dc'
  },
  {
    id: 'ET-1010', name: 'Danish Raza', age: 26, course: 'Electrical Engineering',
    email: 'danish.r@example.com', phone: '+92 315 0001111',
    address: 'Township, Faisalabad', status: 'Inactive',
    enrollDate: '2021-09-01',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Danish&backgroundColor=ffdfbf'
  },
  {
    id: 'ET-1011', name: 'Mariam Iqbal', age: 23, course: 'Computer Science',
    email: 'mariam.i@example.com', phone: '+92 308 3334444',
    address: 'Bahria Town, Rawalpindi', status: 'Active',
    enrollDate: '2024-04-01',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mariam&backgroundColor=b6e3f4'
  },
  {
    id: 'ET-1012', name: 'Kamran Shah', age: 22, course: 'Software Engineering',
    email: 'kamran.sh@example.com', phone: '+92 333 6667778',
    address: 'Gulshan-e-Iqbal, Karachi', status: 'Active',
    enrollDate: '2024-04-15',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kamran&backgroundColor=c0aede'
  }
];

/* ══════════════════════════════════════════════════════════════════
   STUDENT CLASS — encapsulates all student logic
══════════════════════════════════════════════════════════════════ */
class StudentManager {
  constructor() {
    this.students = [];          // in-memory array
    this.currentPage = 1;
    this.itemsPerPage = 8;
    this.editingId = null;       // null = add mode; string = edit mode
    this.viewingId = null;
    this.searchQuery = '';
    this.statusFilter = '';
    this.courseFilter = '';
    this.nextIdCounter = 1013;   // auto-increment ID seed

    this.loadFromStorage();
  }

  /* ── Storage ──────────────────────────────────────── */
  loadFromStorage() {
    const raw = localStorage.getItem('edutrack_students');
    if (raw) {
      this.students = JSON.parse(raw);
      // Determine next safe ID
      this.nextIdCounter = this.students.reduce((max, s) => {
        const num = parseInt(s.id.replace('ET-', '')) || 0;
        return Math.max(max, num + 1);
      }, this.nextIdCounter);
    } else {
      // First visit — seed with demo data
      this.students = DEMO_STUDENTS;
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem('edutrack_students', JSON.stringify(this.students));
  }

  /* ── CRUD ─────────────────────────────────────────── */
  addStudent(data) {
    const student = {
      id: `ET-${this.nextIdCounter++}`,
      name: data.name.trim(),
      age: parseInt(data.age),
      course: data.course,
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      address: data.address.trim() || '—',
      status: data.status,
      enrollDate: data.enrollDate || new Date().toISOString().split('T')[0],
      img: data.img.trim() ||
        `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(data.name)}`
    };
    this.students.unshift(student); // newest first
    this.saveToStorage();
    return student;
  }

  updateStudent(id, data) {
    const idx = this.students.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.students[idx] = {
      ...this.students[idx],
      name: data.name.trim(),
      age: parseInt(data.age),
      course: data.course,
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      address: data.address.trim() || '—',
      status: data.status,
      enrollDate: data.enrollDate || this.students[idx].enrollDate,
      img: data.img.trim() || this.students[idx].img
    };
    this.saveToStorage();
    return this.students[idx];
  }

  deleteStudent(id) {
    const before = this.students.length;
    this.students = this.students.filter(s => s.id !== id);
    if (this.students.length < before) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getById(id) { return this.students.find(s => s.id === id) || null; }

  /* ── Filtering / searching ────────────────────────── */
  getFiltered() {
    let list = [...this.students];
    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    }
    if (this.statusFilter) {
      list = list.filter(s => s.status === this.statusFilter);
    }
    if (this.courseFilter) {
      list = list.filter(s => s.course === this.courseFilter);
    }
    return list;
  }

  getPaginated() {
    const filtered = this.getFiltered();
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / this.itemsPerPage));
    if (this.currentPage > pages) this.currentPage = pages;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const items = filtered.slice(start, start + this.itemsPerPage);
    return { items, total, pages, page: this.currentPage, start };
  }

  /* ── Stats ────────────────────────────────────────── */
  getStats() {
    const total   = this.students.length;
    const active  = this.students.filter(s => s.status === 'Active').length;
    const courses = [...new Set(this.students.map(s => s.course))].length;
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    const recent  = this.students.filter(s =>
      s.enrollDate && new Date(s.enrollDate) >= weekAgo
    ).length;
    return { total, active, courses, recent };
  }

  getCourseBreakdown() {
    const map = {};
    this.students.forEach(s => {
      map[s.course] = (map[s.course] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }

  getRecentStudents(n = 5) {
    return [...this.students]
      .sort((a, b) => new Date(b.enrollDate) - new Date(a.enrollDate))
      .slice(0, n);
  }
}

/* ══════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION UTILITY
══════════════════════════════════════════════════════════════════ */
const Toast = {
  container: null,

  init() { this.container = document.getElementById('toastContainer'); },

  show(message, type = 'info') {
    // type: 'success' | 'error' | 'warning' | 'info'
    const icons = {
      success: 'ph-check-circle',
      error:   'ph-x-circle',
      warning: 'ph-warning',
      info:    'ph-info'
    };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
      <i class="ph-duotone ${icons[type]} toast-icon"></i>
      <span class="toast-msg">${message}</span>
    `;
    this.container.appendChild(el);
    // Auto-remove after animation completes
    setTimeout(() => el.remove(), 4000);
  }
};

/* ══════════════════════════════════════════════════════════════════
   MAIN APPLICATION CONTROLLER
══════════════════════════════════════════════════════════════════ */
class App {
  constructor() {
    this.mgr = new StudentManager();
    this.currentSection = 'dashboard';
    this.profileDeleteId = null; // used in profile modal delete
  }

  /* ── Bootstrap ────────────────────────────────────── */
  init() {
    Toast.init();
    this.bindAll();
    this.checkAuth();
  }

  /* ── Auth & Startup ───────────────────────────────── */
  checkAuth() {
    // Show loading first, then decide: login or dashboard
    setTimeout(() => {
      document.getElementById('loadingScreen').classList.add('hidden');
      const loggedIn = sessionStorage.getItem('edutrack_auth');
      if (loggedIn) {
        this.showApp();
      } else {
        document.getElementById('loginPage').classList.remove('hidden');
      }
    }, 2700);
  }

  showApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('appWrapper').classList.remove('hidden');
    this.renderAll();
  }

  logout() {
    sessionStorage.removeItem('edutrack_auth');
    document.getElementById('appWrapper').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
  }

  /* ── Bind all event listeners ─────────────────────── */
  bindAll() {
    /* LOGIN */
    document.getElementById('loginBtn').addEventListener('click', () => this.handleLogin());
    document.getElementById('loginPassword').addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleLogin();
    });
    document.getElementById('togglePw').addEventListener('click', () => {
      const pw = document.getElementById('loginPassword');
      const icon = document.getElementById('pwEyeIcon');
      if (pw.type === 'password') {
        pw.type = 'text'; icon.className = 'ph ph-eye-slash';
      } else {
        pw.type = 'password'; icon.className = 'ph ph-eye';
      }
    });

    /* SIDEBAR NAV */
    document.querySelectorAll('.nav-item[data-section]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        this.navigateTo(link.dataset.section);
        this.closeMobileSidebar();
      });
    });
    // "View all" link in dashboard card
    document.querySelectorAll('.card-link[data-section]').forEach(link => {
      link.addEventListener('click', e => { e.preventDefault(); this.navigateTo(link.dataset.section); });
    });

    /* SIDEBAR COLLAPSE */
    document.getElementById('sidebarCollapseBtn').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
      document.getElementById('mainArea').classList.toggle('shifted');
    });

    /* MOBILE MENU */
    document.getElementById('mobileMenuBtn').addEventListener('click', () => this.openMobileSidebar());
    document.getElementById('sidebarOverlay').addEventListener('click', () => this.closeMobileSidebar());

    /* THEME TOGGLE */
    document.getElementById('themeToggleBtn').addEventListener('click', () => this.toggleTheme());

    /* LOGOUT */
    document.getElementById('logoutNavBtn').addEventListener('click', e => { e.preventDefault(); this.logout(); });

    /* EXPORT */
    document.getElementById('exportBtn').addEventListener('click', e => { e.preventDefault(); this.exportJSON(); });

    /* ADD STUDENT BUTTONS */
    document.getElementById('openAddModalBtn').addEventListener('click', () => this.openAddModal());
    document.getElementById('dashAddStudentBtn').addEventListener('click', () => {
      this.navigateTo('students');
      setTimeout(() => this.openAddModal(), 100);
    });
    document.getElementById('emptyAddBtn').addEventListener('click', () => this.openAddModal());

    /* STUDENT FORM */
    document.getElementById('studentForm').addEventListener('submit', e => {
      e.preventDefault(); this.handleFormSubmit();
    });
    document.getElementById('closeStudentModal').addEventListener('click', () => this.closeStudentModal());
    document.getElementById('cancelStudentModal').addEventListener('click', () => this.closeStudentModal());
    document.getElementById('studentModalOverlay').addEventListener('click', e => {
      if (e.target === document.getElementById('studentModalOverlay')) this.closeStudentModal();
    });

    /* PROFILE MODAL */
    document.getElementById('closeProfileModal').addEventListener('click', () => this.closeProfileModal());
    document.getElementById('profileModalOverlay').addEventListener('click', e => {
      if (e.target === document.getElementById('profileModalOverlay')) this.closeProfileModal();
    });
    document.getElementById('profileEditBtn').addEventListener('click', () => {
      const id = this.viewingId;
      this.closeProfileModal();
      this.openEditModal(id);
    });
    document.getElementById('profileDeleteBtn').addEventListener('click', () => {
      const id = this.viewingId;
      this.closeProfileModal();
      this.confirmDelete(id);
    });

    /* SEARCH (global topbar) */
    document.getElementById('globalSearch').addEventListener('input', e => {
      this.mgr.searchQuery = e.target.value;
      this.mgr.currentPage = 1;
      this.navigateTo('students');
      this.renderStudentsTable();
    });

    /* SEARCH (table filter) */
    document.getElementById('tableSearch').addEventListener('input', e => {
      this.mgr.searchQuery = e.target.value;
      this.mgr.currentPage = 1;
      this.renderStudentsTable();
    });

    /* STATUS & COURSE FILTER */
    document.getElementById('statusFilter').addEventListener('change', e => {
      this.mgr.statusFilter = e.target.value;
      this.mgr.currentPage = 1;
      this.renderStudentsTable();
    });
    document.getElementById('courseFilter').addEventListener('change', e => {
      this.mgr.courseFilter = e.target.value;
      this.mgr.currentPage = 1;
      this.renderStudentsTable();
    });

    /* PAGINATION */
    document.getElementById('prevPageBtn').addEventListener('click', () => {
      if (this.mgr.currentPage > 1) { this.mgr.currentPage--; this.renderStudentsTable(); }
    });
    document.getElementById('nextPageBtn').addEventListener('click', () => {
      const { pages } = this.mgr.getPaginated();
      if (this.mgr.currentPage < pages) { this.mgr.currentPage++; this.renderStudentsTable(); }
    });

    /* ESC key closes modals */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeStudentModal();
        this.closeProfileModal();
      }
    });
  }

  /* ── LOGIN ────────────────────────────────────────── */
  handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pw    = document.getElementById('loginPassword').value;
    let valid = true;

    document.getElementById('emailError').textContent = '';
    document.getElementById('pwError').textContent = '';

    if (!email) {
      document.getElementById('emailError').textContent = 'Email is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('emailError').textContent = 'Enter a valid email.';
      valid = false;
    }
    if (!pw) {
      document.getElementById('pwError').textContent = 'Password is required.';
      valid = false;
    }
    if (!valid) return;

    // Demo credentials check
    if (email === 'hafsashakeel245@gmail.com' && pw === 'admin123' ||
        email === 'hafsashakeel289@gmail.com' && pw === 'uaf291314') {
      sessionStorage.setItem('edutrack_auth', '1');
      const btn = document.getElementById('loginBtn');
      btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Signing in…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<span>Sign In</span><i class="ph ph-arrow-right"></i>';
        btn.disabled = false;
        this.showApp();
      }, 900);
    } else {
      document.getElementById('pwError').textContent = 'Invalid email or password.';
      Toast.show('Invalid email or password. Check your credentials.', 'error');
    }
  }

  /* ── Navigation ───────────────────────────────────── */
  navigateTo(section) {
    this.currentSection = section;
    // Update active section
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(`${section}Section`);
    if (targetSection) targetSection.classList.add('active');
    // Update nav items
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
      item.classList.toggle('active', item.dataset.section === section);
    });
    // Update page title
    const titles = { dashboard: 'Dashboard', students: 'Students', courses: 'Courses' };
    document.getElementById('pageTitle').textContent = titles[section] || section;

    // Render the relevant section
    if (section === 'students') this.renderStudentsTable();
    if (section === 'courses')  this.renderCourses();
    if (section === 'dashboard') this.renderDashboard();
  }

  /* ── Render All (initial load) ────────────────────── */
  renderAll() {
    this.populateCourseFilter();
    this.renderDashboard();
    this.renderStudentsTable();
    this.renderCourses();
    this.updateNavBadge();
    // Load saved theme
    const saved = localStorage.getItem('edutrack_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeIcon').className = saved === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
  }

  /* ── DASHBOARD ────────────────────────────────────── */
  renderDashboard() {
    const stats = this.mgr.getStats();
    document.getElementById('statTotal').textContent   = stats.total;
    document.getElementById('statCourses').textContent = stats.courses;
    document.getElementById('statActive').textContent  = stats.active;
    document.getElementById('statRecent').textContent  = stats.recent;

    // Recent table
    const recent = this.mgr.getRecentStudents(5);
    const tbody  = document.getElementById('recentTableBody');
    tbody.innerHTML = recent.map(s => `
      <tr>
        <td>
          <div class="student-cell">
            <img src="${s.img}" alt="${s.name}" class="student-avatar" onerror="this.src='https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(s.name)}'"/>
            <div>
              <div class="student-name">${this.esc(s.name)}</div>
              <div class="student-id-small">${s.id}</div>
            </div>
          </div>
        </td>
        <td>${this.esc(s.course)}</td>
        <td>${this.formatDate(s.enrollDate)}</td>
        <td>${this.statusBadge(s.status)}</td>
      </tr>
    `).join('');
  }

  /* ── STUDENTS TABLE ───────────────────────────────── */
  renderStudentsTable() {
    const { items, total, pages, page, start } = this.mgr.getPaginated();
    const tbody   = document.getElementById('mainTableBody');
    const empty   = document.getElementById('emptyState');
    const pagWrap = document.getElementById('paginationWrap');

    // Sync search input value in case navigation changed it
    document.getElementById('tableSearch').value = this.mgr.searchQuery;

    // Update count label
    document.getElementById('studentCountLabel').textContent =
      `${total} student${total !== 1 ? 's' : ''} found`;

    if (items.length === 0) {
      tbody.innerHTML = '';
      empty.classList.remove('hidden');
      pagWrap.classList.add('hidden');
      return;
    }

    empty.classList.add('hidden');
    pagWrap.classList.remove('hidden');

    tbody.innerHTML = items.map((s, i) => `
      <tr data-id="${s.id}">
        <td><span style="font-size:12px;color:var(--text-muted)">${s.id}</span></td>
        <td>
          <div class="student-cell">
            <img src="${s.img}" alt="${s.name}" class="student-avatar"
              onerror="this.src='https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(s.name)}'"/>
            <div>
              <div class="student-name">${this.esc(s.name)}</div>
              <div class="student-id-small">${this.esc(s.email)}</div>
            </div>
          </div>
        </td>
        <td>${s.age}</td>
        <td>${this.esc(s.course)}</td>
        <td style="font-size:13px">${this.esc(s.email)}</td>
        <td>${this.statusBadge(s.status)}</td>
        <td>
          <div class="action-btns">
            <button class="act-btn act-btn-view"   title="View"   onclick="app.openProfileModal('${s.id}')"><i class="ph ph-eye"></i></button>
            <button class="act-btn act-btn-edit"   title="Edit"   onclick="app.openEditModal('${s.id}')"><i class="ph ph-pencil-simple"></i></button>
            <button class="act-btn act-btn-delete" title="Delete" onclick="app.confirmDelete('${s.id}')"><i class="ph ph-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    // Pagination info
    document.getElementById('pageInfo').textContent =
      `Showing ${start + 1}–${Math.min(start + this.mgr.itemsPerPage, total)} of ${total}`;

    // Page number buttons
    const pageNumsEl = document.getElementById('pageNumbers');
    pageNumsEl.innerHTML = '';
    for (let p = 1; p <= pages; p++) {
      const btn = document.createElement('button');
      btn.className = `page-num${p === page ? ' active' : ''}`;
      btn.textContent = p;
      btn.addEventListener('click', () => { this.mgr.currentPage = p; this.renderStudentsTable(); });
      pageNumsEl.appendChild(btn);
    }

    document.getElementById('prevPageBtn').disabled = page === 1;
    document.getElementById('nextPageBtn').disabled = page === pages;

    this.updateNavBadge();
  }

  /* ── COURSES ──────────────────────────────────────── */
  renderCourses() {
    const breakdown = this.mgr.getCourseBreakdown();
    const total     = this.mgr.students.length;
    const max       = breakdown[0]?.[1] || 1;
    const icons     = ['ph-monitor','ph-code','ph-chart-bar','ph-brain','ph-shield-check',
                       'ph-briefcase','ph-wrench','ph-lightning','ph-paint-brush','ph-heart'];
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = breakdown.map(([name, count], i) => `
      <div class="course-card">
        <div class="course-icon"><i class="ph-duotone ${icons[i % icons.length]}"></i></div>
        <div class="course-name">${this.esc(name)}</div>
        <div class="course-count">${count} student${count !== 1 ? 's' : ''} enrolled</div>
        <div class="course-bar-wrap">
          <div class="course-bar" style="width:${Math.round((count/max)*100)}%"></div>
        </div>
      </div>
    `).join('') || `<p style="color:var(--text-muted);padding:24px">No courses yet.</p>`;
  }

  /* ── FILTER DROPDOWN ──────────────────────────────── */
  populateCourseFilter() {
    const courses = [...new Set(this.mgr.students.map(s => s.course))].sort();
    const sel = document.getElementById('courseFilter');
    // Keep first "All Courses" option
    while (sel.options.length > 1) sel.remove(1);
    courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      sel.appendChild(opt);
    });
  }

  /* ── NAV BADGE ────────────────────────────────────── */
  updateNavBadge() {
    document.getElementById('navStudentCount').textContent = this.mgr.students.length;
  }

  /* ── MODAL: ADD ───────────────────────────────────── */
  openAddModal() {
    this.mgr.editingId = null;
    document.getElementById('modalTitle').textContent = 'Add Student';
    document.getElementById('saveStudentBtn').innerHTML = '<i class="ph ph-floppy-disk"></i> Save Student';
    this.clearForm();
    // Set today as default enroll date
    document.getElementById('fEnrollDate').value = new Date().toISOString().split('T')[0];
    this.showModal('studentModalOverlay');
  }

  /* ── MODAL: EDIT ──────────────────────────────────── */
  openEditModal(id) {
    const s = this.mgr.getById(id);
    if (!s) return;
    this.mgr.editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Student';
    document.getElementById('saveStudentBtn').innerHTML = '<i class="ph ph-floppy-disk"></i> Update Student';

    // Populate form fields
    document.getElementById('studentId').value   = s.id;
    document.getElementById('fName').value        = s.name;
    document.getElementById('fAge').value         = s.age;
    document.getElementById('fEmail').value       = s.email;
    document.getElementById('fPhone').value       = s.phone;
    document.getElementById('fCourse').value      = s.course;
    document.getElementById('fStatus').value      = s.status;
    document.getElementById('fAddress').value     = s.address !== '—' ? s.address : '';
    document.getElementById('fEnrollDate').value  = s.enrollDate || '';
    document.getElementById('fImgUrl').value      = s.img || '';

    this.clearErrors();
    this.showModal('studentModalOverlay');
  }

  /* ── MODAL: CLOSE ─────────────────────────────────── */
  closeStudentModal() {
    this.hideModal('studentModalOverlay');
    this.mgr.editingId = null;
  }

  /* ── FORM SUBMIT ──────────────────────────────────── */
  handleFormSubmit() {
    const data = {
      name:       document.getElementById('fName').value,
      age:        document.getElementById('fAge').value,
      email:      document.getElementById('fEmail').value,
      phone:      document.getElementById('fPhone').value,
      course:     document.getElementById('fCourse').value,
      status:     document.getElementById('fStatus').value,
      address:    document.getElementById('fAddress').value,
      enrollDate: document.getElementById('fEnrollDate').value,
      img:        document.getElementById('fImgUrl').value
    };

    if (!this.validateForm(data)) return;

    if (this.mgr.editingId) {
      this.mgr.updateStudent(this.mgr.editingId, data);
      Toast.show(`${data.name} updated successfully.`, 'success');
    } else {
      this.mgr.addStudent(data);
      Toast.show(`${data.name} added successfully!`, 'success');
    }

    this.closeStudentModal();
    this.populateCourseFilter();
    this.renderAll();
    // Switch to students section so user sees the result
    this.navigateTo('students');
  }

  /* ── FORM VALIDATION ──────────────────────────────── */
  validateForm(data) {
    this.clearErrors();
    let valid = true;

    if (!data.name || data.name.trim().length < 2) {
      document.getElementById('fNameErr').textContent = 'Name must be at least 2 characters.';
      valid = false;
    }
    const age = parseInt(data.age);
    if (!data.age || isNaN(age) || age < 16 || age > 60) {
      document.getElementById('fAgeErr').textContent = 'Age must be between 16 and 60.';
      valid = false;
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      document.getElementById('fEmailErr').textContent = 'Enter a valid email address.';
      valid = false;
    }
    if (!data.phone || data.phone.trim().length < 7) {
      document.getElementById('fPhoneErr').textContent = 'Enter a valid phone number.';
      valid = false;
    }
    if (!data.course) {
      document.getElementById('fCourseErr').textContent = 'Please select a course.';
      valid = false;
    }
    if (!data.status) {
      document.getElementById('fStatusErr').textContent = 'Please select a status.';
      valid = false;
    }
    return valid;
  }

  clearErrors() {
    ['fNameErr','fAgeErr','fEmailErr','fPhoneErr','fCourseErr','fStatusErr'].forEach(id => {
      document.getElementById(id).textContent = '';
    });
  }

  clearForm() {
    document.getElementById('studentForm').reset();
    this.clearErrors();
    document.getElementById('studentId').value = '';
  }

  /* ── DELETE ───────────────────────────────────────── */
  confirmDelete(id) {
    const s = this.mgr.getById(id);
    if (!s) return;
    // Browser confirm (clean UX alternative would be a custom modal)
    if (!confirm(`Delete ${s.name} (${s.id})? This action cannot be undone.`)) return;
    this.mgr.deleteStudent(id);
    Toast.show(`${s.name} has been removed.`, 'warning');
    this.populateCourseFilter();
    this.renderAll();
    this.renderStudentsTable();
  }

  /* ── PROFILE MODAL ────────────────────────────────── */
  openProfileModal(id) {
    const s = this.mgr.getById(id);
    if (!s) return;
    this.viewingId = id;

    // Banner color based on status
    const colors = { Active: '#6c63ff,#2dd4bf', Inactive: '#f43f5e,#e879a0', 'On Leave': '#fbbf24,#f59e0b' };
    const grad = colors[s.status] || '6c63ff,2dd4bf';
    document.getElementById('profileBanner').style.background =
      `linear-gradient(135deg, #${grad.split(',').join(', #')})`;

    // Avatar
    const avatar = document.getElementById('profileAvatar');
    avatar.src = s.img || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(s.name)}`;
    avatar.onerror = () => avatar.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(s.name)}`;

    document.getElementById('profileName').textContent          = s.name;
    document.getElementById('profileIdLabel').textContent       = s.id;
    document.getElementById('profileStatusBadge').outerHTML     = this.statusBadge(s.status).replace('class="badge', 'id="profileStatusBadge" class="badge');
    document.getElementById('profileCourse').textContent  = s.course;
    document.getElementById('profileAge').textContent     = `${s.age} years old`;
    document.getElementById('profileEmail').textContent   = s.email;
    document.getElementById('profilePhone').textContent   = s.phone;
    document.getElementById('profileAddress').textContent = s.address;
    document.getElementById('profileEnroll').textContent  = this.formatDate(s.enrollDate);

    this.showModal('profileModalOverlay');
  }

  closeProfileModal() {
    this.hideModal('profileModalOverlay');
    this.viewingId = null;
  }

  /* ── THEME TOGGLE ─────────────────────────────────── */
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('edutrack_theme', next);
    document.getElementById('themeIcon').className = next === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    Toast.show(`Switched to ${next} mode`, 'info');
  }

  /* ── EXPORT JSON ──────────────────────────────────── */
  exportJSON() {
    const data = JSON.stringify(this.mgr.students, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `edutrack-students-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    Toast.show(`Exported ${this.mgr.students.length} students to JSON.`, 'success');
  }

  /* ── MOBILE SIDEBAR ───────────────────────────────── */
  openMobileSidebar() {
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('hidden');
  }
  closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.add('hidden');
  }

  /* ── MODAL HELPERS ────────────────────────────────── */
  showModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  hideModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = '';
  }

  /* ── FORMATTING HELPERS ───────────────────────────── */
  statusBadge(status) {
    const map = {
      Active:    'badge-active',
      Inactive:  'badge-inactive',
      'On Leave':'badge-onleave'
    };
    return `<span class="badge ${map[status] || ''}">${this.esc(status)}</span>`;
  }

  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr :
      d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // Escape HTML to prevent XSS
  esc(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }
}

/* ══════════════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════════════ */
const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());
