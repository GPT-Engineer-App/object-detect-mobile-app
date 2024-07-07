import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [selectedModel, setSelectedModel] = useState("efficientdet");
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize your preferences.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Object Detection Model</CardTitle>
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yolov7" id="yolov7" />
              <Label htmlFor="yolov7">YOLOv7</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="efficientdet_d7" id="efficientdet_d7" />
              <Label htmlFor="efficientdet_d7">EfficientDet-D7</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Real-time Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Label htmlFor="realTimeAnalysis">Enable Real-time Analysis</Label>
            <Switch
              id="realTimeAnalysis"
              checked={realTimeAnalysis}
              onCheckedChange={setRealTimeAnalysis}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;