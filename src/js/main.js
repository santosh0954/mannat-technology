$(document).ready(function () {
  // Your code here
  $(".year").text(new Date().getFullYear());

  // testimonial owl slider
  const testimonial = $(".testimonial-slider");
  testimonial.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  $(".testimonial-nav .next-btn").click(function () {
    console.log("working");
    testimonial.trigger("next.owl.carousel");
  });

  $(".testimonial-nav .prev-btn").click(function () {
    testimonial.trigger("prev.owl.carousel");
  });

  $(".navbar-toggler").click(function () {
    $("#navbarNav").addClass("d-block");
    $("body").addClass("overflow-hidden");
  });
  $("#close-menu").click(function () {
    $("#navbarNav").removeClass("d-block");
    $("body").removeClass("overflow-hidden");
  });
});
