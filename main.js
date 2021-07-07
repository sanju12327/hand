Prediction_1 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format : 'png',
    png_quality: 90
});

camera = document.getElementById("camer");


Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + Prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iGBBOCp_3/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded')
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) 
{
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        Prediction_1 = results[0].label;
        speak();
    }   
}
