# Cross-Platform Mobile Object Detection App

## Project Description

This project is a cross-platform mobile application designed for real-time object detection. The initial phase focuses on setting up the essential components and framework without incorporating advanced features.

## Core Requirements

1. **Mobile Framework**: React Native for cross-platform development (iOS and Android).
2. **Machine Learning Framework**: TensorFlow Lite for on-device object detection.
3. **Camera Integration**: Access to the device's camera and display a live video feed in the app.
4. **Basic Object Detection**: Rudimentary object detection capabilities using a placeholder or sample model.
5. **Bounding Box Display**: Draw bounding boxes around detected objects on the camera feed.
6. **User Interface**: Minimal UI with a camera view and basic controls (e.g., start/stop detection).

## Setup Instructions

### Prerequisites

- Node.js
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/mobile-object-detection-app.git
   cd mobile-object-detection-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the app on iOS:
   ```sh
   npx react-native run-ios
   ```

4. Run the app on Android:
   ```sh
   npx react-native run-android
   ```

## Project Structure

- `src/components`: Reusable components.
- `src/screens`: Screen components.
- `src/utils`: Utility functions.

## Usage

- Open the app on your mobile device.
- Allow camera access when prompted.
- Use the button to start/stop object detection.
- Detected objects will be highlighted with bounding boxes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.