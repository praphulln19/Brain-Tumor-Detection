from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Mock prediction function for testing without TensorFlow
def mock_prediction():
    """Generate mock prediction results for testing"""
    predictions = [
        {'prediction': 'No Tumor', 'confidence': 0.95, 'color': '#10b981'},
        {'prediction': 'Glioma', 'confidence': 0.87, 'color': '#ef4444'},
        {'prediction': 'Meningioma', 'confidence': 0.91, 'color': '#f59e0b'},
        {'prediction': 'Pituitary', 'confidence': 0.89, 'color': '#8b5cf6'}
    ]
    return random.choice(predictions)

@app.route('/', methods=['GET'])
def home():
    """API health check"""
    return jsonify({
        "message": "🧠 Brain Tumor Detection API is running!",
        "status": "healthy",
        "version": "1.0.0",
        "endpoints": ["/", "/predict", "/health"]
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Backend is running smoothly! 🚀"
    })

@app.route('/predict', methods=['POST'])
def predict_tumor():
    """Predict brain tumor from uploaded image (mock version)"""
    try:
        # Check if image was uploaded
        if 'file' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No image selected"}), 400
        
        # Simulate processing time
        time.sleep(2)
        
        # Generate mock prediction
        result = mock_prediction()
        
        return jsonify({
            "success": True,
            "prediction": result['prediction'],
            "confidence": result['confidence'],
            "confidence_percentage": round(result['confidence'] * 100, 1),
            "color": result['color'],
            "message": f"Analysis complete! Detected: {result['prediction']} with {round(result['confidence'] * 100, 1)}% confidence.",
            "note": "This is a demo version. Actual model will provide real predictions."
        })
        
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

if __name__ == '__main__':
    print("🧠 Starting Brain Tumor Detection API...")
    print("✅ Flask and CORS installed successfully!")
    print("🔧 Running in DEMO mode (mock predictions)")
    print("🌐 Backend will be available at: http://localhost:5000")
    print("🚀 Starting server...")
    
    # Run the Flask app
    app.run(debug=True, host='localhost', port=5000)