$(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  $("#year").text(new Date().getFullYear());

  /* ---------- Ambient Cursor Spotlight ---------- */
  const $spotlight = $('<div class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60"></div>');
  $("body").append($spotlight);

  $(document).on("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    $spotlight.css(
      "background",
      `radial-gradient(650px circle at ${x}px ${y}px, rgba(108, 124, 247, 0.08), rgba(47, 217, 199, 0.03) 40%, transparent 80%)`
    );
  });

  /* ---------- Mobile Menu ---------- */
  const $menuBtn = $("#menu-btn");
  const $mobileMenu = $("#mobile-menu");

  $menuBtn.on("click", function () {
    const isOpen = $mobileMenu.is(":visible");
    $mobileMenu.slideToggle(200);
    $menuBtn.attr("aria-expanded", String(!isOpen));
  });

  $(".mobile-link").on("click", function () {
    $mobileMenu.slideUp(180);
    $menuBtn.attr("aria-expanded", "false");
  });

  /* ---------- Smooth Scroll for In-Page Links ---------- */
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this).attr("href");
    if (target.length > 1 && $(target).length) {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $(target).offset().top - 64 },
        600
      );
    }
  });

  /* ---------- Sticky Header & Scroll Progress ---------- */
  const $header = $("#site-header");
  const $progress = $("#scroll-progress");

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    if (scrollTop > 20) {
      $header.addClass("bg-ink/90 shadow-xl shadow-black/40 border-line/80 backdrop-blur-lg");
    } else {
      $header.removeClass("shadow-xl shadow-black/40 border-line/80");
    }

    const docHeight = $(document).height() - $(window).height();
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $progress.css("width", pct + "%");
  }).trigger("scroll");

  /* ---------- Active Nav Link on Scroll ---------- */
  const $sections = $("section[id]");
  const $navLinks = $(".nav-link");

  function updateActiveNav() {
    const scrollPos = $(window).scrollTop() + 140;
    let currentId = null;

    $sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      if (scrollPos >= top && scrollPos < bottom) {
        currentId = $(this).attr("id");
      }
    });

    $navLinks.removeClass("text-amber active").addClass("text-fog");
    if (currentId) {
      $navLinks.filter('[data-target="' + currentId + '"]')
        .removeClass("text-fog")
        .addClass("text-amber active");
    }
  }
  $(window).on("scroll", updateActiveNav);
  updateActiveNav();

  /* ---------- Directional Reveal Animations ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  function initialTransform(direction) {
    switch (direction) {
      case "left": return "translateX(-32px)";
      case "right": return "translateX(32px)";
      case "scale": return "scale(0.92)";
      case "up":
      default: return "translateY(30px)";
    }
  }

  revealEls.forEach((el) => {
    const direction = el.getAttribute("data-reveal") || "up";
    el.style.opacity = "0";
    el.style.transform = initialTransform(direction);
    el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

    const parent = el.parentElement;
    if (parent) {
      const siblingReveals = Array.from(parent.children).filter((c) =>
        c.hasAttribute && c.hasAttribute("data-reveal")
      );
      const idx = siblingReveals.indexOf(el);
      if (idx > 0) {
        el.style.transitionDelay = Math.min(idx * 90, 360) + "ms";
      }
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translate(0, 0) scale(1)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Timeline Line Drawing
    const timelineEl = document.getElementById("timeline");
    const timelineLine = document.getElementById("timeline-line");
    if (timelineEl && timelineLine) {
      const lineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timelineLine.classList.add("grow");
              lineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      lineObserver.observe(timelineEl);
    }
  } else {
    revealEls.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    const timelineLine = document.getElementById("timeline-line");
    if (timelineLine) timelineLine.classList.add("grow");
  }

  /* ---------- Signature Equalizer Bars Animation ---------- */
  function buildEqualizer($container, barCount, minH, maxH) {
    $container.empty();
    for (let i = 0; i < barCount; i++) {
      const $bar = $('<span class="eq-bar"></span>');
      $container.append($bar);
    }
    animateEqualizer($container, minH, maxH);
  }

  function animateEqualizer($container, minH, maxH) {
    $container.children().each(function () {
      const $bar = $(this);
      (function loop() {
        const h = Math.random() * (maxH - minH) + minH;
        const duration = 250 + Math.random() * 350;
        $bar.animate({ height: h }, duration, loop);
      })();
    });
  }

  buildEqualizer($("#equalizer"), 32, 6, 48);

  /* ---------- Role Cycler ---------- */
  const roles = [
    "Voice Artist",
    "Fashion Model",
    "Cinematic Photographer",
    "Media & Branding Director",
    "Abstract Painter"
  ];
  let roleIndex = 0;
  const $roleCycler = $("#role-cycler");

  function cycleRole() {
    $roleCycler.css({ opacity: 0, transform: "translateY(6px)" });
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      $roleCycler.text(roles[roleIndex]);
      $roleCycler.css({ transition: "opacity 0.4s ease, transform 0.4s ease", opacity: 1, transform: "translateY(0)" });
    }, 280);
  }
  if ($roleCycler.length) {
    setInterval(cycleRole, 2600);
  }

  /* ---------- Web Audio API Synth & Live Canvas Waveform Visualizer ---------- */
  let audioCtx = null;
  let activeOsc = null;
  let activeGain = null;
  let isAudioPlaying = false;
  let currentPlayingBtn = null;
  let visualizerAnimFrame = null;

  const canvas = document.getElementById("audio-canvas");
  const canvasCtx = canvas ? canvas.getContext("2d") : null;

  function initAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playSynthVoiceDemo(pitchFreq, typePreset, btnEl) {
    initAudioCtx();

    if (isAudioPlaying) {
      stopSynthAudio();
      if (currentPlayingBtn === btnEl) {
        return;
      }
    }

    currentPlayingBtn = btnEl;
    if (btnEl) {
      $(btnEl).addClass("playing-active").find(".play-icon").html('<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>');
      $(btnEl).find(".play-label").text("Stop Demo");
    }

    // Create rich harmonic sound simulation (Voice formant oscillator)
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const mainGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    let baseFreq = pitchFreq || 140; // Male voice resonant frequency
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(baseFreq * 1.5, audioCtx.currentTime);

    // Apply voice filter preset sound shaping
    if (typePreset === "vintage" || typePreset === "radio") {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
      filter.Q.setValueAtTime(3.0, audioCtx.currentTime);
    } else if (typePreset === "trailer") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, audioCtx.currentTime);
      baseFreq = 95; // Deep bass voice
      osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
    } else if (typePreset === "dubbing") {
      filter.type = "peaking";
      filter.frequency.setValueAtTime(2200, audioCtx.currentTime);
      filter.gain.setValueAtTime(6, audioCtx.currentTime);
    } else {
      // Studio condenser (crisp & clean)
      filter.type = "highshelf";
      filter.frequency.setValueAtTime(3000, audioCtx.currentTime);
      filter.gain.setValueAtTime(4, audioCtx.currentTime);
    }

    // Dynamic pitch modulation (vocal cadence)
    const now = audioCtx.currentTime;
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.4);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 1.2);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + 2.0);

    mainGain.gain.setValueAtTime(0.01, now);
    mainGain.gain.linearRampToValueAtTime(0.18, now + 0.1);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.8);
    osc2.stop(now + 3.8);

    activeOsc = osc1;
    activeGain = mainGain;
    isAudioPlaying = true;

    startCanvasVisualizer(typePreset);

    setTimeout(() => {
      if (currentPlayingBtn === btnEl) {
        stopSynthAudio();
      }
    }, 3800);
  }

  function stopSynthAudio() {
    if (activeGain && audioCtx) {
      try {
        activeGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      } catch (e) {}
    }
    isAudioPlaying = false;
    if (currentPlayingBtn) {
      $(currentPlayingBtn).removeClass("playing-active").find(".play-icon").html('<path d="M8 5v14l11-7z" fill="currentColor"/>');
      $(currentPlayingBtn).find(".play-label").text("Play Demo");
      currentPlayingBtn = null;
    }
  }

  function startCanvasVisualizer(preset) {
    if (!canvasCtx || !canvas) return;
    cancelAnimationFrame(visualizerAnimFrame);

    let phase = 0;
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = canvas.parentElement.clientHeight;

    function renderFrame() {
      canvasCtx.clearRect(0, 0, width, height);

      if (!isAudioPlaying) {
        // Idle gentle wave animation
        phase += 0.02;
        canvasCtx.beginPath();
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgba(47, 217, 199, 0.25)";
        for (let x = 0; x < width; x += 5) {
          const y = height / 2 + Math.sin(x * 0.015 + phase) * 8;
          if (x === 0) canvasCtx.moveTo(x, y);
          else canvasCtx.lineTo(x, y);
        }
        canvasCtx.stroke();
        visualizerAnimFrame = requestAnimationFrame(renderFrame);
        return;
      }

      phase += 0.08;
      const barCount = 48;
      const barWidth = width / barCount;

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.abs(Math.sin(i * 0.2 + phase) * Math.cos(i * 0.1 + phase * 1.4)) * (height * 0.7) + 6;

        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        const gradient = canvasCtx.createLinearGradient(0, y, 0, y + barHeight);
        if (preset === "vintage" || preset === "radio") {
          gradient.addColorStop(0, "#F59E0B");
          gradient.addColorStop(1, "#EF4444");
        } else if (preset === "trailer") {
          gradient.addColorStop(0, "#8B5CF6");
          gradient.addColorStop(1, "#3B82F6");
        } else {
          gradient.addColorStop(0, "#2FD9C7");
          gradient.addColorStop(1, "#6C7CF7");
        }

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      visualizerAnimFrame = requestAnimationFrame(renderFrame);
    }

    renderFrame();
  }

  // Initialize canvas on load
  if (canvas) {
    startCanvasVisualizer("default");
    $(window).on("resize", function () {
      if (canvas) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    });
  }

  // Voice Card & Demo Buttons Trigger
  $(document).on("click", ".play-demo-btn", function () {
    const pitch = parseFloat($(this).attr("data-pitch")) || 135;
    const preset = $(this).attr("data-preset") || "condenser";
    playSynthVoiceDemo(pitch, preset, this);
  });

  /* ---------- Studio Mic Simulator Control Panel ---------- */
  const micPresets = {
    condenser: {
      title: "Studio Condenser Mic",
      badge: "Commercial / High-Fidelity",
      script: '"Jamuna Future Park — Where extraordinary experiences begin every single day."',
      pitch: 140,
      freqText: "20Hz - 20kHz • Ultra Clean Highs"
    },
    radio: {
      title: "Vintage FM Broadcast Mic",
      badge: "On-Air Radio / Broadcast",
      script: '"Good evening Dhaka! You are tuned in live, carrying smooth tracks and warm vibes."',
      pitch: 160,
      freqText: "80Hz - 15kHz • Warm FM Compression"
    },
    dubbing: {
      title: "Character Dubbing Booth",
      badge: "Cartoons & Dubbed Series",
      script: '"Hold on tight! We are venturing into unexplored worlds beyond the horizon!"',
      pitch: 180,
      freqText: "100Hz - 12kHz • Dynamic Character Punch"
    },
    trailer: {
      title: "Cinema Trailer Voice",
      badge: "Deep Cinematic Narration",
      script: '"In a world ruled by passion and artistry, one voice redefined the standard."',
      pitch: 95,
      freqText: "30Hz - 18kHz • Deep Resonance Sub-Bass"
    }
  };

  $(".mic-preset-tab").on("click", function () {
    const mode = $(this).attr("data-mode");
    const data = micPresets[mode];
    if (!data) return;

    $(".mic-preset-tab").removeClass("border-amber text-amber bg-amber/10").addClass("border-line text-fog");
    $(this).removeClass("border-line text-fog").addClass("border-amber text-amber bg-amber/10");

    $("#sim-mic-title").text(data.title);
    $("#sim-mic-badge").text(data.badge);
    $("#sim-mic-script").text(data.script);
    $("#sim-mic-freq").text(data.freqText);

    $("#sim-play-btn").attr("data-pitch", data.pitch).attr("data-preset", mode);

    // Auto preview synth audio
    playSynthVoiceDemo(data.pitch, mode, $("#sim-play-btn")[0]);
  });

  /* ---------- Voice Category Tabs ---------- */
  $(".voice-tab-btn").on("click", function () {
    const category = $(this).attr("data-category");
    $(".voice-tab-btn").removeClass("bg-violet text-paper shadow-lg shadow-violet/30").addClass("bg-surface border border-line text-fog hover:text-paper");
    $(this).removeClass("bg-surface border border-line text-fog hover:text-paper").addClass("bg-violet text-paper shadow-lg shadow-violet/30");

    if (category === "all") {
      $(".voice-item-card").show(300);
    } else {
      $(".voice-item-card").hide(200);
      $('.voice-item-card[data-category="' + category + '"]').show(300);
    }
  });

  /* ---------- Photography & Art Filter Tabs ---------- */
  $(".gallery-filter-btn").on("click", function () {
    const filter = $(this).attr("data-filter");

    $(".gallery-filter-btn").removeClass("bg-amber text-ink font-semibold").addClass("bg-surface border border-line text-fog hover:text-paper");
    $(this).removeClass("bg-surface border border-line text-fog hover:text-paper").addClass("bg-amber text-ink font-semibold");

    if (filter === "all") {
      $(".gallery-item-wrapper").fadeIn(300);
    } else {
      $(".gallery-item-wrapper").hide();
      $('.gallery-item-wrapper[data-category="' + filter + '"]').fadeIn(300);
    }
  });

  /* ---------- 3D Tilt Hover Effect ---------- */
  function enableTilt(selector, strength) {
    $(selector).each(function () {
      const $el = $(this);
      $el.css({ transformStyle: "preserve-3d", willChange: "transform" });

      $el.on("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateY = ((x - cx) / cx) * strength;
        const rotateX = -((y - cy) / cy) * strength;
        $el.css("transform", `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
      });

      $el.on("mouseleave", function () {
        $el.css("transform", "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
      });
    });
  }
  enableTilt("[data-tilt]", 8);
  enableTilt("[data-tilt-soft]", 3);

  /* ---------- Photo Lightbox ---------- */
  const $lightbox = $("#lightbox");
  const $lightboxImg = $("#lightbox-img");
  const $lightboxCounter = $("#lightbox-counter");
  const $lightboxTitle = $("#lightbox-title");
  let currentPhoto = 0;

  function getVisibleGalleryItems() {
    return $(".gallery-item-wrapper:visible .gallery-item");
  }

  function openLightbox(index) {
    const $visibleItems = getVisibleGalleryItems();
    if (index >= $visibleItems.length) index = 0;
    currentPhoto = index;
    showPhoto();
    $lightbox.removeClass("hidden").addClass("flex");
    $("body").css("overflow", "hidden");
  }

  function closeLightbox() {
    $lightbox.addClass("hidden").removeClass("flex");
    $("body").css("overflow", "");
  }

  function showPhoto() {
    const $visibleItems = getVisibleGalleryItems();
    if (!$visibleItems.length) return;
    const $item = $visibleItems.eq(currentPhoto);
    $lightboxImg.attr("src", $item.data("full"));
    $lightboxImg.attr("alt", $item.find("img").attr("alt"));
    if ($lightboxTitle.length) {
      $lightboxTitle.text($item.data("caption") || "Creative Portfolio Work");
    }
    $lightboxCounter.text((currentPhoto + 1) + " / " + $visibleItems.length);
  }

  $(document).on("click", ".gallery-item", function () {
    const $visibleItems = getVisibleGalleryItems();
    const idx = $visibleItems.index(this);
    openLightbox(idx >= 0 ? idx : 0);
  });

  $("#lightbox-close").on("click", closeLightbox);
  $("#lightbox").on("click", function (e) {
    if (e.target.id === "lightbox") closeLightbox();
  });
  $("#lightbox-next").on("click", function () {
    const count = getVisibleGalleryItems().length;
    currentPhoto = (currentPhoto + 1) % count;
    showPhoto();
  });
  $("#lightbox-prev").on("click", function () {
    const count = getVisibleGalleryItems().length;
    currentPhoto = (currentPhoto - 1 + count) % count;
    showPhoto();
  });

  $(document).on("keydown", function (e) {
    if ($lightbox.hasClass("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") $("#lightbox-next").click();
    if (e.key === "ArrowLeft") $("#lightbox-prev").click();
  });

  /* ---------- Interactive Contact Form Project Type Selector ---------- */
  $(".project-type-chip").on("click", function () {
    $(".project-type-chip").removeClass("border-violet bg-violet/20 text-violet").addClass("border-line bg-surface text-fog");
    $(this).removeClass("border-line bg-surface text-fog").addClass("border-violet bg-violet/20 text-violet");
    $("#project-type-input").val($(this).attr("data-type"));
  });

  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    const $status = $("#form-status");
    $status.removeClass("hidden").html('✨ <span class="text-paper font-semibold">Thank you for your inquiry!</span> Rishi\'s team will get back to you within 24 hours.');
    this.reset();
    setTimeout(() => {
      $status.addClass("hidden");
    }, 6000);
  });
});
