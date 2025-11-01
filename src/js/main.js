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
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        $("#xCord").val(position.coords.latitude);
        $("#yCord").val(position.coords.longitude);
        console.log(
          "Latitude:",
          position.coords.latitude,
          "Longitude:",
          position.coords.longitude
        );
      },
      function (error) {
        console.error("Location access denied:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  // form submission
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    const name = $("#name").val();
    const phone = $("#phone").val();
    const pincode = $("#email").val();
    const message = $("#message").val();
    const lat = $("#xCord").val();
    const lon = $("#yCord").val();

    const formData = {
      Name: name,
      ContactNo: phone,
      Pincode: pincode,
      Message: message,
      Latitute: lat,
      Longitude: lon,
    };

    console.log(formData);
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
      error: function (err) {
        console.log(err);
        alert(
          "There was an error sending your message. Please try again later."
        );
      },
    });
  });
});
