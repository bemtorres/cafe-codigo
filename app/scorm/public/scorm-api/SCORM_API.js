(function () {
  'use strict';

  var data = {
    'cmi.core.student_id': '',
    'cmi.core.student_name': '',
    'cmi.core.lesson_location': '',
    'cmi.core.credit': 'credit',
    'cmi.core.lesson_status': 'not attempted',
    'cmi.core.entry': 'ab-initio',
    'cmi.core.score.raw': '',
    'cmi.core.score.max': '',
    'cmi.core.score.min': '',
    'cmi.core.total_time': '',
    'cmi.core.exit': '',
    'cmi.suspend_data': '',
    'cmi.comments': '',
    'cmi.comments_from_lms': '',
  };

  var initialized = false;
  var terminated = false;
  var lastError = 0;

  var errorStrings = {
    0: 'No error',
    101: 'General exception',
    201: 'Invalid argument error',
    202: 'Element cannot have children',
    203: 'Element not an array',
    301: 'Not initialized',
    401: 'Not implemented error',
  };

  function getErrorString(code) {
    return errorStrings[code] || 'Unknown error';
  }

  window.API = {
    LMSInitialize: function () {
      if (initialized) { lastError = 101; return 'false'; }
      initialized = true;
      terminated = false;
      lastError = 0;

      var name = data['cmi.core.student_name'] || '';
      if (!name) {
        try {
          name = document.body.getAttribute('data-student-name') || '';
        } catch (e) {}
      }

      return 'true';
    },

    LMSFinish: function () {
      if (!initialized) { lastError = 301; return 'false'; }
      terminated = true;
      initialized = false;
      lastError = 0;
      return 'true';
    },

    LMSGetValue: function (name) {
      if (!initialized) { lastError = 301; return ''; }
      if (typeof name !== 'string') { lastError = 201; return ''; }
      lastError = 0;
      return data[name] !== undefined ? data[name] : '';
    },

    LMSSetValue: function (name, value) {
      if (!initialized) { lastError = 301; return 'false'; }
      if (typeof name !== 'string') { lastError = 201; return 'false'; }
      data[name] = String(value);
      lastError = 0;
      return 'true';
    },

    LMSCommit: function () {
      if (!initialized) { lastError = 301; return 'false'; }
      lastError = 0;
      return 'true';
    },

    LMSGetLastError: function () {
      return lastError;
    },

    LMSGetErrorString: function (code) {
      return getErrorString(code !== undefined ? code : lastError);
    },

    LMSGetDiagnostic: function (code) {
      return getErrorString(code !== undefined ? code : lastError);
    },
  };
})();
