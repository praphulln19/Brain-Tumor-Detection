from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global variables
model = None
class_labels = ['glioma', 'meningioma', 'notumor', 'pituitary']
IMAGE_SIZE = 128

def load_brain_tumor_model():
    """Load the trained brain tumor detection model"""
    global model
    try:
        model_path = os.path.join(os.path.dirname(__file__), '..', 'model.h5')
        if os.path.exists(model_path):
            model = load_model(model_path)
            print("✅ Model loaded successfully!")
            return True
        else:
            print("❌ Model file not found. Please train and save the model first.")
            return False
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        return False

def preprocess_image(image):
    """Preprocess image for model prediction"""
    try:
        # Resize image to model input size
        image = image.resize((IMAGE_SIZE, IMAGE_SIZE))
        
        # Convert to array and normalize
        img_array = img_to_array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        raise Exception(f"Error preprocessing image: {str(e)}")

@app.route('/', methods=['GET'])
def home():
    """API health check"""
    return jsonify({
        "message": "Brain Tumor Detection API is running!",
        "model_loaded": model is not None,
        "classes": class_labels
    })

@app.route('/predict', methods=['POST'])
def predict_tumor():
    """Predict brain tumor from uploaded image"""
    try:
        if model is None:
            return jsonify({"error": "Model not loaded. Please check model.h5 file."}), 500
        
        # Check if image was uploaded (React sends as 'file')
        if 'file' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No image selected"}), 400
        
        # Process the uploaded image
        image = Image.open(file.stream)
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class_index = np.argmax(predictions[0])
        confidence_score = float(np.max(predictions[0]))
        predicted_class = class_labels[predicted_class_index]
        
        # Format result
        if predicted_class == 'notumor':
            result = "No Tumor Detected"
            tumor_type = None
        else:
            result = f"Tumor Detected: {predicted_class.title()}"
            tumor_type = predicted_class
        
        # Get all class probabilities
        class_probabilities = {}
        for i, class_name in enumerate(class_labels):
            class_probabilities[class_name] = float(predictions[0][i])
        
        return jsonify({
            "success": True,
            "result": result,
            "tumor_type": tumor_type,
            "confidence": confidence_score,
            "confidence_percentage": round(confidence_score * 100, 2),
            "class_probabilities": class_probabilities,
            "is_tumor": predicted_class != 'notumor'
        })
        
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded model"""
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    try:
        return jsonify({
            "model_loaded": True,
            "input_shape": model.input_shape,
            "output_classes": len(class_labels),
            "class_labels": class_labels,
            "model_summary": str(model.summary())
        })
    except Exception as e:
        return jsonify({"error": f"Error getting model info: {str(e)}"}), 500

if __name__ == '__main__':
    print("🧠 Starting Brain Tumor Detection API...")
    
    # Load the model on startup
    if load_brain_tumor_model():
        print("🚀 API ready! Model loaded successfully.")
    else:
        print("⚠️  API starting without model. Please ensure model.h5 exists.")
    
    # Run the Flask app
    app.run(debug=True, host='localhost', port=5000)
