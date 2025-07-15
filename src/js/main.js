$(document).ready(function () {
  // get width of the brand element then divide children width based on that
  const marqueeWidth = $(".marquee").width();
  $(".marquee ul li").width(marqueeWidth / 4);

  // scrolltrigger script for portfolio
  gsap.registerPlugin(ScrollTrigger);
  const scroller = document.body;
  // const scrollTrigger = ScrollTrigger.create({
  //   scroller: scroller,
  //   wrapper: ".p-card",
  // });

  let cards = document.querySelectorAll(".p-card");

  gsap.set(cards, { opacity: 0, scale: 0.8 });
  cards.forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      zIndex: index,
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        snap: false,
        end: "bottom 70%",
        scrub: true,
        markers: false,
      },
    });
  });

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
  // form submission
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    const formData = $(this).serialize();
    const name = $("#name").val();
    const phone = $("#phone").val();
    const pincode = $("#exampleInputEmail1").val();
    const message = $("#message").val();

    let lat = null;
    let lon = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          console.log("Latitude:", lat, "Longitude:", lon);
        },
        function (error) {
          console.error("Location access denied:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    const xmlData = {
      name: name,
      ContactNo: phone,
      pincode: pincode,
      message: message,
      xCord: lat,
      yCord: lon,
    };
    console.log(xmlData);
    $.ajax({
      type: "POST",
      url: "https://leads.mannattechnologies.in/api/Leads",
      data: formData,
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      success: function () {
        alert("Thank you for your message!");
        $("#contact-form")[0].reset();
      },
      error: function () {
        alert(
          "There was an error sending your message. Please try again later."
        );
      },
    });
  });
});
