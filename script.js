$(document).ready(function () {
  $(".insert").submit(function (event) {
    var formData = {
      username: $("#exampleInputuser1").val(),
      email: $("#exampleInputEmail1").val(),
      password: $("#exampleInputPassword1").val(),
    };

    $.ajax({
      type: "POST",
      url: "https://thebetashow.com/meet/wp-json/addapi/v1/createuser",
      data: formData,
      // dataType: "json",
      // encode: true,
    }).done(function (data) {
      console.log(data);
    });

    // $.ajax({
    //   type: "POST",
    //   url: "https://thebetashow.com/ravi/wp-json/addapi/v1/createuser",
    //   data: formData,
    //   // dataType: "json",
    //   // encode: true,
    // }).done(function (data) {
    //   console.log(data);
    // });

    event.preventDefault();
  });
});

$(document).ready(function () {
  $.ajax({
    url: "https://thebetashow.com/meet/wp-json/userapi/v1/fetchuser",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var receveData = data;
      console.log(receveData);
      receveData.forEach(function (item) {
        $("#table_id tr:last").after(
          `<tr> <td>${item.ID}</td> <td>${item.display_name}</td> <td>${item.user_email}</td> <td>${item.user_registered}</td>  <td class="edit" data-id=${item.ID}><button class=" btn btn-secondary">Edit</button></td>  <td><button data-id=${item.ID} class=" btn btn-danger">delete</button></td></tr>`
        );
      });
      $(".edit").click(function () {
        $(".hide-insert").css("display", "none");
        var newid = $(this).attr("data-id");
        $.ajax({
          url: `https://thebetashow.com/meet/wp-json/userapi/v1/updateuser?ID=${newid}`,
          type: "POST",
          dataType: "json",
          success: function (data) {
            console.log(data);
            $(".hide-form").css("display", "block");
            data.forEach(function (item) {
              $("#update-mail").val(item.user_email);
              $("#update-user").val(item.display_name);
              $("#update-id").val(item.ID);
            });
          },
        });
      });

      $(".btn-danger").click(function () {
        var newid = $(this).attr("data-id");
        console.log(newid);
        $.ajax({
          url: `https://thebetashow.com/meet/wp-json/userapi/v1/deleteuser?ID=${newid}`,
          type: "POST",
          dataType: "json",
          success: function (data) {
            console.log(data);
            location.reload();
          },
        });
      });
    },
  });
});

$(document).ready(function () {
  $(".update-form").submit(function (event) {
    var updateData = {
      username: $("#update-user").val(),
      email: $("#update-mail").val(),
      id: $("#update-id").val(),
    };
    $.ajax({
      url: "https://thebetashow.com/meet/wp-json/userapi/v1/updateinput",
      type: "POST",
      data: updateData,
      dataType: "json",
    }).done(function (data) {
      console.log(data);
      $("#update-user").val("");
      $("#update-mail").val("");
      $("#update-id").val("");
      $(".hide-form").css("display", "none");
      location.reload();
    });
    event.preventDefault();
  });
});

$(document).ready(function () {
  $(".close").click(function () {
    $(".hide-form").css("display", "none");
  });

  $(".close-add").click(function () {
    $(".hide-insert").css("display", "none");
  });
  $(".btn-warning").click(function () {
    $(".hide-insert").css("display", "block");
    $(".hide-form").css("display", "none");
  });
  $(".edit").click(function () {
    $(".hide-insert").css("display", "none");
  });
});
