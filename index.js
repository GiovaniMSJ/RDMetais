window.addEventListener('DOMContentLoaded', function () {
    var posicaoAtual = 0;
    var totalItens = 6;
    var itensPorVez = 3;

    var slide = document.getElementById('slide');
    if (!slide) {
        return;
    }

    var itensOriginais = Array.from(slide.children);

    for (var i = 0; i < itensPorVez; i++) {
        var clone = itensOriginais[i].cloneNode(true);
        slide.appendChild(clone);
    }

    window.proximoSlide = function () {
        posicaoAtual++;
        moverSlide();
    }

    window.voltarSlide = function () {
        posicaoAtual--;
        moverSlide();
    }

    function moverSlide() {
        if (slide) {
            var percentualPorItem = 100 / itensPorVez;
            var deslocamento = posicaoAtual * percentualPorItem;

            slide.style.transition = 'transform 0.5s ease-in-out';
            slide.style.transform = 'translateX(-' + deslocamento + '%)';

            if (posicaoAtual >= totalItens) {
                console.log('🔄 Chegou no clone! Resetando instantaneamente...');
                setTimeout(function () {
                    slide.style.transition = 'none';
                    posicaoAtual = 0;
                    slide.style.transform = 'translateX(0%)';

                    setTimeout(function () {
                        slide.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }

            if (posicaoAtual < 0) {
                slide.style.transition = 'none';
                posicaoAtual = totalItens - 1;
                var resetDesloc = posicaoAtual * percentualPorItem;
                slide.style.transform = 'translateX(-' + resetDesloc + '%)';

                setTimeout(function () {
                    slide.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }

            var indicadores = document.querySelectorAll('.indicator');
            var indicadorAtivo = posicaoAtual % totalItens;
            indicadores.forEach(function (ind, i) {
                if (i === indicadorAtivo) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        }
    }

    var autoplayInterval;
    var velocidadeAutoplay = 5000;

    function iniciarAutoplay() {
        autoplayInterval = setInterval(function () {
            proximoSlide();
        }, velocidadeAutoplay);
    }

    function pararAutoplay() {
        clearInterval(autoplayInterval);
    }

    function reiniciarAutoplay() {
        pararAutoplay();
        iniciarAutoplay();
    }

    var container = document.querySelector('.carrossel-container');
    if (container) {
        container.addEventListener('mouseenter', function () {
            pararAutoplay();
        });

        container.addEventListener('mouseleave', function () {
            iniciarAutoplay();
        });
    }

    var btnNext = document.getElementById('btnNext');
    var btnPrev = document.getElementById('btnPrev');

    if (btnNext) {
        btnNext.addEventListener('click', function () {
            reiniciarAutoplay();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', function () {
            reiniciarAutoplay();
        });
    }

    document.querySelectorAll('.indicator').forEach(function (indicator, index) {
        indicator.addEventListener('click', function () {
            posicaoAtual = index;
            moverSlide();
            reiniciarAutoplay();
        });
    });

    iniciarAutoplay();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const ctaButtons = document.querySelectorAll('a[href*="wa.me"], a[href^="tel:"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

});

function hideMapLoading() {
    const loading = document.getElementById('mapLoading');
    if (loading) {
        loading.style.display = 'none';
    }
}
