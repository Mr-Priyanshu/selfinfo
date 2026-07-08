/* -------------------------------------------------------------
 * Priyanshu Garg Developer Portfolio - Terminal Controller v2.0
 * ------------------------------------------------------------- */

export const TerminalController = {
  bodyEl: null,
  tabs: {},
  activeTab: 'logs',
  logInterval: null,
  isDiagnosing: false,
  logLines: [
    { text: "Initializing secure connection to Meta Ad Manager API...", type: "info" },
    { text: "Authentication successful. Access Token: ACTIVE (expires in 58d)", type: "success" },
    { text: "n8n pipeline scheduler triggered: Sync CRM Leads", type: "pipeline" },
    { text: "Fetching real-time campaign statistics for 'Priyanshu_Promo_Q3'...", type: "info" },
    { text: "GET /v19.0/act_184209/insights?fields=clicks,impressions,spend - 200 OK", type: "success" },
    { text: "Syncing campaign: 148 clicks, 2,840 impressions, CTR: 5.21%", type: "db" },
    { text: "Incoming Lead detected via Meta Webhook (LeadID: 88472910)", type: "pipeline" },
    { text: "Executing Lead routing rules: [High Priority -> Tech Team]", type: "info" },
    { text: "Inserting lead data into PostgreSQL lead_routing_queue...", type: "db" },
    { text: "INSERT INTO leads (meta_id, name, status) VALUES ($1, $2, $3) - SUCCESS", type: "success" },
    { text: "Triggering WhatsApp Business API message dispatch...", type: "info" },
    { text: "Sending template 'welcome_followup' to recipient +91-704XX-XX032", type: "whatsapp" },
    { text: "POST /v18.0/phone_number_id/messages - Status: SENT (200)", type: "success" },
    { text: "Polling Google Ads campaign stats for Whiteforce client profile...", type: "info" },
    { text: "Fetched yesterday's metrics: impressions=12K clicks=420 conv=14.2%", type: "success" },
    { text: "Syncing performance cache in Redis (execution time: 9ms)...", type: "db" },
    { text: "WhatsApp Webhook received: customer replied 'Yes, schedule call'", type: "whatsapp" },
    { text: "Parsing response intent: SCHEDULE_CALL. Updating lead status...", type: "pipeline" },
    { text: "Routing task update to internal CLMS dashboard...", type: "info" },
    { text: "Pipeline run complete. Memory utilization: 34.2MB. System IDLE.", type: "success" }
  ],
  logIndex: 0,

  init() {
    this.bodyEl = document.getElementById('terminal-body-content');
    if (!this.bodyEl) return;

    this.setupTabs();
    this.setupDiagnostics();
    
    // Start generating mock logs immediately
    this.showLogsView(true);
  },

  setupTabs() {
    const tabs = document.querySelectorAll('.terminal-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (this.isDiagnosing) return; // Prevent tab switching during diagnostics
        
        const targetTab = tab.getAttribute('data-tab');
        if (targetTab === this.activeTab) return;

        // Update active class
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        this.activeTab = targetTab;
        this.switchTabContent(targetTab);
      });
    });
  },

  switchTabContent(tabName) {
    // Clear existing content timers
    this.stopLogsLoop();

    if (tabName === 'logs') {
      this.showLogsView(false);
    } else if (tabName === 'config') {
      this.showConfigView();
    } else if (tabName === 'script') {
      this.showScriptView();
    }
  },

  // View: Logs (Dynamic Scrolling Console)
  showLogsView(isInitial = false) {
    if (isInitial) {
      this.bodyEl.innerHTML = `<div class="text-slate-500 mb-2">// Connecting node channels... type [Diagnostics] for health check.</div>`;
      this.printNextLog();
      this.printNextLog();
      this.printNextLog();
    } else {
      this.bodyEl.innerHTML = `<div class="text-slate-500 mb-2">// Re-established stream. Printing pipeline outputs:</div>`;
    }

    // Schedule regular log printouts
    this.logInterval = setInterval(() => {
      this.printNextLog();
    }, 1800);
  },

  printNextLog() {
    if (!this.bodyEl) return;

    const log = this.logLines[this.logIndex];
    const timestamp = new Date().toLocaleTimeString();
    
    let colorClass = 'text-slate-300';
    let prefix = 'info';

    switch(log.type) {
      case 'success':
        colorClass = 'text-emerald-400';
        prefix = 'ok';
        break;
      case 'pipeline':
        colorClass = 'text-cyan-400';
        prefix = 'pipe';
        break;
      case 'db':
        colorClass = 'text-purple-400';
        prefix = 'db';
        break;
      case 'whatsapp':
        colorClass = 'text-amber-400';
        prefix = 'wa';
        break;
    }

    const logLineDiv = document.createElement('div');
    logLineDiv.className = 'mb-1 text-[11px] leading-relaxed select-all hover:bg-white/5 px-1 rounded transition-colors';
    logLineDiv.innerHTML = `
      <span class="text-slate-600 mr-1.5">[${timestamp}]</span>
      <span class="text-cyberCyan font-bold mr-1.5">${prefix}:</span>
      <span class="${colorClass}">${log.text}</span>
    `;

    this.bodyEl.appendChild(logLineDiv);

    // Keep log volume capped at 40 lines
    while (this.bodyEl.children.length > 40) {
      this.bodyEl.removeChild(this.bodyEl.firstChild);
    }

    // Scroll to bottom
    this.bodyEl.scrollTop = this.bodyEl.scrollHeight;

    // Increment index circular list
    this.logIndex = (this.logIndex + 1) % this.logLines.length;
  },

  stopLogsLoop() {
    if (this.logInterval) {
      clearInterval(this.logInterval);
      this.logInterval = null;
    }
  },

  // View: Config (Profile Object)
  showConfigView() {
    const configData = {
      developer: "Priyanshu Garg",
      location: "Jabalpur, MP, India",
      experience: "3+ Years",
      role: "Senior Full-Stack & Automation Architect",
      skills: {
        mern: ["MongoDB", "Express", "React", "Node"],
        automation: ["Meta Ads API", "WhatsApp Business API", "n8n", "cron workflows"],
        databases: ["MySQL", "PostgreSQL", "Redis"],
        hosting: ["Docker", "Linux", "AWS", "cPanel"]
      },
      availability: "Active // Available for contracts"
    };

    const formattedJSON = JSON.stringify(configData, null, 2);
    const highlighted = this.highlightSyntax(formattedJSON, 'json');

    this.bodyEl.innerHTML = `
      <div class="text-slate-500 mb-2">// Current Developer System Configuration</div>
      <pre class="text-[11px] text-slate-300 leading-normal select-all">${highlighted}</pre>
    `;
  },

  // View: Script (Sample Pipeline Integration)
  showScriptView() {
    const codeString = `// Meta Lead Webhook Automation Pipeline
const express = require('express');
const metaService = require('./services/meta');
const db = require('./config/db');

async function handleWebhook(req, res) {
  const { leadId, formId } = req.body;
  console.log(\`[Meta API] Received lead \${leadId}\`);
  
  try {
    // 1. Fetch complete lead payload
    const lead = await metaService.getLeadDetails(leadId);
    
    // 2. Commit lead into client database
    await db.query('INSERT INTO leads SET ?', lead);
    
    // 3. Dispatch automated WhatsApp notification
    await metaService.sendWhatsAppAlert(lead);
    
    res.sendStatus(200);
  } catch (err) {
    console.error('Lead pipeline failed:', err);
    res.sendStatus(500);
  }
}`;

    const highlighted = this.highlightSyntax(codeString, 'javascript');

    this.bodyEl.innerHTML = `
      <div class="text-slate-500 mb-2">// Real-World API webhook handler blueprint</div>
      <pre class="text-[11px] text-slate-300 leading-relaxed overflow-x-auto whitespace-pre select-all">${highlighted}</pre>
    `;
  },

  // Micro Syntax Highlighter for basic JS/JSON visual color codes
  highlightSyntax(text, lang) {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (lang === 'json') {
      // Highlight keys
      html = html.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)/g, '<span class="token property">$1</span>$3');
      // Highlight string values
      html = html.replace(/(:\s*)("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")/g, '$1<span class="token string">$2</span>');
      // Highlight numbers
      html = html.replace(/(:\s*)(\d+(\.\d+)?)/g, '$1<span class="token number">$2</span>');
      // Highlight booleans
      html = html.replace(/(:\s*)(true|false)/g, '$1<span class="token boolean">$2</span>');
    } else if (lang === 'javascript') {
      // Keywords
      const keywords = ['const', 'let', 'var', 'async', 'await', 'function', 'try', 'catch', 'require', 'return', 'import', 'export'];
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'g');
        html = html.replace(regex, `<span class="token keyword">${kw}</span>`);
      });

      // Strings
      html = html.replace(/('[^']*')/g, '<span class="token string">$1</span>');
      html = html.replace(/("[^"]*")/g, '<span class="token string">$1</span>');
      html = html.replace(/(`[^`]*`)/g, '<span class="token string">$1</span>');

      // Comments
      html = html.replace(/(\/\/[^\n]*)/g, '<span class="token comment">$1</span>');
      
      // Numbers
      html = html.replace(/\b(\d+)\b/g, '<span class="token number">$1</span>');
    }

    return html;
  },

  // Diagnostics Button Sequence (Audit)
  setupDiagnostics() {
    const diagBtn = document.getElementById('terminal-diag-btn');
    const spinner = document.getElementById('diag-spinner');
    const btnText = document.getElementById('diag-btn-text');

    if (!diagBtn || !spinner || !btnText) return;

    diagBtn.addEventListener('click', () => {
      if (this.isDiagnosing) return;

      this.isDiagnosing = true;
      diagBtn.classList.add('opacity-75');
      spinner.classList.remove('hidden');
      btnText.textContent = 'Auditing...';

      // Switch to Logs Tab
      const tabs = document.querySelectorAll('.terminal-tab');
      tabs.forEach(t => t.classList.remove('active'));
      const logsTab = Array.from(tabs).find(t => t.getAttribute('data-tab') === 'logs');
      if (logsTab) logsTab.classList.add('active');

      this.activeTab = 'logs';
      this.stopLogsLoop();

      // Start Diagnostic Sequence
      this.runDiagnosticsSequence(() => {
        // Complete
        this.isDiagnosing = false;
        diagBtn.classList.remove('opacity-75');
        spinner.classList.add('hidden');
        btnText.textContent = 'Diagnostics';
        
        // Resume normal loop
        this.showLogsView(false);
      });
    });
  },

  runDiagnosticsSequence(onComplete) {
    this.bodyEl.innerHTML = '';
    
    const steps = [
      { text: "Executing global pipeline audit v2.0.4...", delay: 200, type: "info" },
      { text: "PING [api.facebook.com]: latency=42ms STATUS: 200 OK", delay: 500, type: "success" },
      { text: "PING [api.whatsapp.com]: latency=112ms STATUS: 200 OK", delay: 400, type: "success" },
      { text: "PING [googleads.googleapis.com]: latency=54ms STATUS: 200 OK", delay: 400, type: "success" },
      { text: "Verifying local cluster state...", delay: 600, type: "info" },
      { text: "MongoDB cluster: connected [primary nodes: 3]", delay: 300, type: "db" },
      { text: "Redis connection state: STABLE (98.4% hits)", delay: 300, type: "db" },
      { text: "Testing n8n automated execution hooks... OK", delay: 500, type: "success" },
      { text: "Local Cron Scheduling modules... ACTIVE", delay: 300, type: "success" },
      { text: "--------------------------------------------------", delay: 200, type: "info" },
      { text: "AUDIT RESULTS: 0 vulnerabilities, 0 latency bottlenecks.", delay: 400, type: "success" },
      { text: "SYSTEM STATUS: 100% HEALTHY. Resuming standard pipeline logs...", delay: 500, type: "pipeline" }
    ];

    let currentStep = 0;

    const printStep = () => {
      if (currentStep >= steps.length) {
        setTimeout(onComplete, 1200);
        return;
      }

      const step = steps[currentStep];
      const logLineDiv = document.createElement('div');
      logLineDiv.className = 'mb-1 text-[11px] leading-relaxed';
      
      let colorClass = 'text-slate-300';
      if (step.type === 'success') colorClass = 'text-emerald-400 font-semibold';
      if (step.type === 'pipeline') colorClass = 'text-cyan-400 font-bold';
      if (step.type === 'db') colorClass = 'text-purple-400';

      const timestamp = new Date().toLocaleTimeString();
      logLineDiv.innerHTML = `
        <span class="text-slate-600 mr-1.5">[${timestamp}]</span>
        <span class="text-cyberCyan font-bold mr-1.5">diag:</span>
        <span class="${colorClass}">${step.text}</span>
      `;

      this.bodyEl.appendChild(logLineDiv);
      this.bodyEl.scrollTop = this.bodyEl.scrollHeight;

      currentStep++;
      setTimeout(printStep, step.delay);
    };

    printStep();
  }
};
