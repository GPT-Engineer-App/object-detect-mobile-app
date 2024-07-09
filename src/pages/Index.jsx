import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Settings, HelpCircle, Save, Play, PauseCircle } from "lucide-react";
import { detectObjects, loadModel } from "@/utils/objectDetection";
import { trackObjects } from "@/utils/objectTracking";

const ObjectDetectionApp = () => {
  const [isActive, setIsActive] = useState(false);
  const [detectionResults, setDetectionResults] = useState([]);
  const [trackedObjects, setTrackedObjects] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedModel, setSelectedModel] = useState("efficientdet");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      const video = videoRef.current;
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
      });
    } else {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
      }
    }
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    const drawDetections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      detectionResults.forEach((detection) => {
        const [x, y, width, height] = detection.bbox;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = 'red';
        ctx.font = '16px Arial';
        ctx.fillText(`${detection.class} (${Math.round(detection.score * 100)}%)`, x, y - 5);
      });

      requestAnimationFrame(drawDetections);
    };

    if (isActive) {
      drawDetections();
    }
  }, [isActive, detectionResults]);

  const handleCapture = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    await loadModel(selectedModel);
    const detections = await detectObjects(canvas);
    setDetectionResults(detections);
    const tracked = trackObjects(detections);
    setTrackedObjects(tracked);
  };

  const handleSwitchCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 1) {
          const currentDeviceId = videoRef.current.srcObject.getVideoTracks()[0].getSettings().deviceId;
          const nextDevice = videoDevices.find(device => device.deviceId !== currentDeviceId);
          if (nextDevice) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: nextDevice.deviceId } });
            videoRef.current.srcObject = stream;
          } else {
            console.log('No other camera found.');
          }
        } else {
          console.log('Only one camera available.');
        }
      }
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  };

  const handleSettings = () => {
    setShowSettingsModal(true);
  };

  const handleHelp = () => {
    setShowHelpModal(true);
  };

  const handleSaveResults = () => {
    try {
      const results = {
        detectionResults,
        trackedObjects,
        timestamp: new Date().toISOString(),
      };
      const savedResults = JSON.parse(localStorage.getItem("detectionResults")) || [];
      savedResults.push(results);
      localStorage.setItem("detectionResults", JSON.stringify(savedResults));
      console.log("Detection results saved!");
    } catch (error) {
      console.error("Error saving detection results:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Object Detection App</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-full max-w-md h-64 bg-gray-200 rounded-lg overflow-hidden">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="primary" onClick={() => setIsActive(true)}>
                Activate Camera
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="outline" size="icon" onClick={() => setIsActive(!isActive)}>
            {isActive ? <PauseCircle className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleCapture}>
            <Camera className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleSwitchCamera}>
            <Camera className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleSettings}>
            <Settings className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleHelp}>
            <HelpCircle className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleSaveResults}>
            <Save className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detection Options</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3">Option 3</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Select Object Detection Model</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="efficientdet" id="efficientdet" />
              <Label htmlFor="efficientdet">EfficientDet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yolov5" id="yolov5" />
              <Label htmlFor="yolov5">YOLOv5</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ssd_mobilenet" id="ssd_mobilenet" />
              <Label htmlFor="ssd_mobilenet">SSD MobileNet</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          {/* Settings content goes here */}
          <Button onClick={() => setShowSettingsModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help & Tutorial</DialogTitle>
          </DialogHeader>
          {/* Help content goes here */}
          <Button onClick={() => setShowHelpModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ObjectDetectionApp;