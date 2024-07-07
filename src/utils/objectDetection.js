import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let models = {};
let currentModel = 'efficientdet';

export const loadModel = async (modelName = 'efficientdet') => {
  if (!models[modelName]) {
    let modelUrl;
    switch (modelName) {
      case 'efficientdet':
        modelUrl = 'https://tfhub.dev/tensorflow/efficientdet/lite2/detection/1';
        break;
      case 'yolov5':
        modelUrl = 'https://tfhub.dev/ultralytics/yolov5/1';
        break;
      case 'ssd_mobilenet':
        modelUrl = 'https://tfhub.dev/tensorflow/ssd_mobilenet_v2/2';
        break;
      default:
        throw new Error('Model not supported');
    }
    models[modelName] = await loadGraphModel(modelUrl);
  }
  currentModel = modelName;
};

export const detectObjects = async (image) => {
  if (!models[currentModel]) {
    await loadModel(currentModel);
  }

  const tensor = tf.browser.fromPixels(image).expandDims(0).toFloat().div(255.0);
  const predictions = await models[currentModel].executeAsync(tensor);

  const [boxes, scores, classes] = await Promise.all([
    predictions[0].array(),
    predictions[1].array(),
    predictions[2].array(),
  ]);

  return boxes.map((box, i) => {
    return {
      box,
      score: scores[i],
      class: classes[i],
    };
  });
};

export const segmentObjects = async (image) => {
  if (!models['coco-ssd']) {
    models['coco-ssd'] = await cocoSsd.load();
  }

  const predictions = await models['coco-ssd'].detect(image);

  return predictions.map(prediction => ({
    bbox: prediction.bbox,
    class: prediction.class,
    score: prediction.score,
    segmentation: prediction.segmentation,
  }));
};