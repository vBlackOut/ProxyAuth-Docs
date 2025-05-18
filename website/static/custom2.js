(function($) {
"use strict";
    $(document).ready(function() {



          document.querySelectorAll('.no-work').forEach(noWorkElement => {
            const overlay = document.createElement('div');
            overlay.className = 'overlay';

            const text = document.createElement('div');
            text.className = 'overlay-text';
            text.textContent = 'NO WORKING ON THIS VERSION';

            overlay.appendChild(text);
            noWorkElement.appendChild(overlay);
          });

        // select versions
        const versionSelect = document.getElementById('version-select');
        if (versionSelect) {
          versionSelect.addEventListener('change', function () {
            const version = this.value.trim();

            if (version === "") {
              window.location.href = `/`;
            } else if (version.includes('/')) {
              // Si on a un fichier comme 0.6.X/3.html, on le redirige tel quel
              window.location.href = `/versions/${version}`;
            } else {
              // Sinon, on redirige vers le dossier de version
              window.location.href = `/versions/${version}`;
            }
          });
        }

        // dropdown element
        $('.header-dropdown').click(function() {
          $(this).next('.content').slideToggle(200);
          $(this).find('.arrow').toggleClass('rotate');
        });

        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);

        let version = "latest";

        if (segments[0] === "versions" && segments.length >= 2) {
          let baseVersion = segments[1];
          let pageNumber = null;

          if (segments.length >= 3 && segments[2].endsWith(".html")) {
            const match = segments[2].match(/^(\d+)\.html$/);
            if (match) {
              pageNumber = match[1];
            }
          }

          if (pageNumber !== null && baseVersion.includes("X")) {
            version = baseVersion.replace("X", pageNumber);
          } else {
            version = baseVersion;
          }
        }

        const display = document.getElementById('version-display');
        if (display) {
          display.textContent = version !== "latest"
          ? `Version: v${version}`
          : `Version: ${version}`;
        }

        // Call Menu Toggler
        appMaster.menuToggler();

        // Example Call anotherFunction
        appMaster.anotherFunction();

        SyntaxHighlighter.config.clipboardSwf = '../../assets/code/js/clipboard.swf';
        SyntaxHighlighter.all();

        // Target your .container, .wrapper, .post, etc.
        $(".video_wrapper").fitVids();

        $('.main-nav a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    var appMaster = {
        menuToggler: function() {
            // Menu Toggler
            $('#menuToggler').on('click', function(e) {
                e.preventDefault();
                /* Act on the event */
                $('#wrapper').toggleClass('toggled');
            });
        },
        anotherFunction: function() {
            // Add you custom here and don't forget to change the object title (anotherFunction)
        }
    }
})(jQuery);

async function getCrateDependencies(crateName, version) {
  const url = `https://crates.io/api/v1/crates/${crateName}/${version}/dependencies`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  const data = await res.json();
  return data.dependencies.map(dep => ({
    name: dep.crate_id,
    version: dep.req,
    kind: dep.kind
  }));
}

async function loadDependencies() {
  const container = document.getElementById('dependencies');
  try {
    const deps = await getCrateDependencies('proxyauth', '0.5.6');
    const ul = document.createElement('ul');

    deps.forEach(dep => {
      if (dep.kind !== 'normal') return; // build/dev deps if needed

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `https://crates.io/crates/${dep.name}/range/%5E${dep.version.replace("^", "")}`;
      a.target = '_blank';
      a.textContent = dep.name;

      li.appendChild(a);
      li.appendChild(document.createTextNode(` = "${dep.version}"`));
      ul.appendChild(li);
    });

    container.innerHTML = '';
    container.appendChild(ul);
  } catch (e) {
    console.error(e);
    container.textContent = `Error load : ${e.message}`;
  }
}

loadDependencies();

$('#tooltip_left').tooltip();

$('#tooltip_left').on('shown.bs.tooltip', function () {
var $tooltip = $(this).data('bs.tooltip').$tip;

if ($tooltip && $tooltip.length) {
  var currentLeft = parseInt($tooltip.css('left'), 10);

  $tooltip[0].style.setProperty('left', (currentLeft - 40) + 'px', 'important');
}
});
