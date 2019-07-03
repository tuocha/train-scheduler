

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDscVYWcPlU7lUCrRafu4de6PebLrKUyoY",
    authDomain: "first-965cd.firebaseapp.com",
    databaseURL: "https://first-965cd.firebaseio.com",
    projectId: "first-965cd",
    storageBucket: "",
    messagingSenderId: "828175760854",
    appId: "1:828175760854:web:72aca080e2008c2e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(".btn").on("click", function () {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var trainData = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    }

    console.log(trainData)
    database.ref().push(trainData)


    var firstTime = moment($("#firstTrainTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

});

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);

    var body = $("tbody").append("<tr>")
    var name = $("<td>").text(snapshot.val().trainName)
    var destination = $("<td>").text(snapshot.val().destination)
    var interval = $("<td>").text(snapshot.val().frequency)

    var firstTrainTime = snapshot.val().firstTrainTime
    var periodical = snapshot.val().frequency

    var format = "hh:mm";
    var firstTrain = moment(firstTrainTime, format)

    var difference = moment().diff(firstTrain, "minutes");

    var timeRemainder = difference % periodical;

    var minutesUntil = periodical - timeRemainder;

    var nextArrival = moment().add(minutesUntil, "minutes").format('hh:mm');

    console.log(firstTrain)
    console.log(difference)
    console.log(timeRemainder)
    console.log(minutesUntil)
    console.log(nextArrival)

    body.append(name).append(destination).append(interval).append(nextArrival).append("<td>" + minutesUntil);

});


