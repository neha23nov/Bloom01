import os
import shutil
from PIL import Image
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.optimizers import Adam

# ✅ Automatically find the directory where the script is located
try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
except NameError:
    # fallback for interactive environments
    BASE_DIR = os.getcwd()

# ✅ Set dataset folder relative to the script
DATASET_DIR = os.path.join(BASE_DIR, "flowers")

print("Looking for dataset at:", DATASET_DIR)

# ✅ Check if dataset exists
if not os.path.exists(DATASET_DIR):
    raise FileNotFoundError(f"❌ Dataset folder not found at {DATASET_DIR}. "
                            f"Please make sure a folder named 'flowers' is placed in the same directory as this script.")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15

# -----------------------------
# Clean Corrupt Images
# -----------------------------
print("Cleaning corrupt images...")
for class_folder in os.listdir(DATASET_DIR):
    class_path = os.path.join(DATASET_DIR, class_folder)
    for img_name in os.listdir(class_path):
        img_path = os.path.join(class_path, img_name)
        try:
            Image.open(img_path).verify()
        except Exception:
            print(f"Removing bad image: {img_path}")
            os.remove(img_path)

# -----------------------------
# Data Generators
# -----------------------------
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.15,
    horizontal_flip=True,
    validation_split=0.2  # 20% validation
)

train_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

num_classes = train_generator.num_classes
print(f"Number of Classes: {num_classes}")

# -----------------------------
# CNN Model
# -----------------------------
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')
])

model.compile(optimizer=Adam(learning_rate=0.0005),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

# -----------------------------
# Train
# -----------------------------
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=val_generator
)

# -----------------------------
# Save Model
# -----------------------------
model_path = os.path.join(BASE_DIR, "flower_classifier.h5")
model.save(model_path)
print(f"✅ Model Saved as {model_path}")
