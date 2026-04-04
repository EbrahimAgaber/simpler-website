# Chapter 7: Neural Networks for Process

Modeling
7.1 Introduction
Many chemical engineering processes exhibit strong nonlinear behavior arising from reaction kinetics,
phase equilibria, transport phenomena, and control interactions. While linear and mildly nonlinear
regression models are effective within limited operating ranges, they often fail to capture complex
input–output relationships over broader conditions.
Neural networks provide a flexible, data-driven modeling framework capable of approximating
highly nonlinear mappings between process inputs and outputs. Rather than imposing a predefined
functional form, neural networks learn relationships directly from data, making them particularly
suitable for systems where first-principles models are incomplete, computationally expensive, or
difficult to calibrate.
This chapter introduces neural networks from a process modeling perspective, emphasizing their
structure, mathematical foundations, and physical interpretation rather than algorithmic abstrac-
tion.
7.2 Why Neural Networks Are Useful in Nonlinear Process Systems
Nonlinearity is intrinsic to chemical engineering systems. Examples include:
• Exponential temperature dependence of reaction rates
• Nonlinear vapor–liquid equilibrium relationships
• Coupled mass and energy balances in reactors
• Saturation and dead-zone effects in actuators and sensors
Traditional modeling approaches address these nonlinearities through detailed mechanistic models,
which require extensive physical knowledge and parameter estimation. Neural networks offer
an alternative by learning nonlinear relationships directly from data, provided sufficient and
representative operating data are available.
From an engineering standpoint, neural networks are particularly useful when:
• The governing physics are partially known but difficult to model explicitly
• The system operates over multiple regimes
• Fast predictions are required for monitoring or control
However, neural networks sacrifice interpretability for flexibility, making careful validation and
engineering judgment essential.
51
7.3 Conceptual Foundations
Neural networks are composed of simple computational units arranged in layers. Each unit performs
a weighted sum of its inputs followed by a nonlinear transformation. By stacking such units, neural
networks can approximate complex nonlinear functions.
The key idea is function approximation: neural networks aim to approximate an unknown mapping
𝑦 = 𝑓(𝑥)
where (𝑥)represents process inputs and (𝑦)represents outputs of interest.
7.4 Perceptrons, Activation Functions, Feedforward Networks
The perceptron is the fundamental building block of a neural network. Given an input vector 𝑥 ∈ ℝ 𝑝,
the perceptron computes:
𝑧 = w⊤𝑥 + 𝑏
where (𝑤)is a vector of weights and (𝑏)is a bias term. The output is then obtained by applying an
activation function 𝜙(⋅):
𝑎 = 𝜙(𝑧)
Common activation functions include the rectified linear unit (ReLU), sigmoid, and hyperbolic
tangent. These nonlinear functions enable the network to model nonlinear process behavior.
A feedforward neural network consists of multiple layers of perceptrons arranged such that information
flows from input to output without feedback. In process modeling, feedforward networks are
commonly used to map steady-state or quasi-steady-state operating conditions to outputs such as
yield, temperature, or conversion.
7.5 Mathematical Formulation
7.5.1 Forward Propagation, Loss Functions, Gradient Descent
Consider a feedforward neural network with one hidden layer. For an input vector (𝑥), the hidden
layer computes:
ℎ = 𝜙(𝑊1𝑥 + 𝑏1)
The output layer then computes:
52
̂ 𝑦 = 𝑊2ℎ + 𝑏2
where (𝑊1, 𝑊2) and (𝑏1, 𝑏2) are weight matrices and bias vectors.
The discrepancy between predicted output ( ̂ 𝑦)and true output (𝑦)is quantified using a loss function,
commonly the mean squared error for regression problems:
𝐿 = 1
𝑛
𝑛
∑
𝑖=1
‖𝑦𝑖 − ̂ 𝑦𝑖‖2
Training a neural network consists of minimizing this loss with respect to the weights and biases.
This is achieved through gradient descent, where parameters are iteratively updated in the direction
of decreasing loss:
𝜃(𝑘+1) = 𝜃 (𝑘) − 𝜂∇𝜃𝐿
Here, (𝜂)is the learning rate, and gradients are computed efficiently using backpropagation.
7.6 Python Implementation
7.6.1 Neural Network for Predicting Nonlinear Process Outputs Using TensorFlow
We now construct a neural network to predict a nonlinear process output from multiple input
variables. The synthetic dataset represents a nonlinear reaction system with temperature, residence
time, and feed concentration as inputs.
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import tensorflow as tf
np.random.seed(42)
tf.random.set_seed(42)
n_samples = 300
temperature = np.random.normal(360, 15, n_samples)
res_time = np.random.normal(4, 0.8, n_samples)
concentration = np.random.uniform(0.5, 1.5, n_samples)
# Nonlinear synthetic process output
yield_reaction = (
0.03 * temperature
53
+ 5.0 * np.log(res_time)
+ 10.0 * np.sin(concentration)
+ np.random.normal(0, 3, n_samples)
)
data = pd.DataFrame({
"Temperature": temperature,
"ResidenceTime": res_time,
"Concentration": concentration,
"Yield": yield_reaction
})
X = data.drop(columns="Yield")
y = data["Yield"]
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(
X_scaled, y, test_size =0.2, random_state =42
)
model = tf.keras.Sequential([
tf.keras.layers.Dense(16, activation ="relu", input_shape =(X_train.shape[1],)),
tf.keras.layers.Dense(16, activation ="relu"),
tf.keras.layers.Dense(1)
])
model.compile(
optimizer=tf.keras.optimizers.Adam(learning_rate=0.01),
loss="mse"
)
history = model.fit(
X_train, y_train,
validation_split=0.2,
epochs=100,
verbose=0
)
y_pred = model.predict(X_test).flatten()
plt.figure()
plt.scatter(y_test, y_pred)
plt.xlabel("Actual Yield" )
plt.ylabel("Predicted Yield" )
plt.title("Neural Network Prediction Performance" )
plt.show()
54
C:\Users\bin-g\AppData\Local\Programs\Python\Python310\lib\site-packages\keras\src\layers\core\dense.py:87: UserWarning: Do not pass an `input_shape`/`input_dim` argument to a layer. When using Sequential models, prefer using an `Input(shape)` object as the first layer in the model instead.
super().__init__(activity_regularizer=activity_regularizer, **kwargs)
2/2 �������������������� 0s 80ms/step
7.7 Engineering Case Study
7.7.1 Modeling a Nonlinear CSTR Process with Multiple Inputs and Outputs
Consider a continuous stirred-tank reactor (CSTR) operating under non-isothermal conditions. The
reactor behavior depends nonlinearly on feed concentration, inlet temperature, residence time, and
heat removal rate. Developing a full mechanistic model requires detailed kinetics and heat-transfer
parameters that may be uncertain or time-varying.
A neural network trained on historical operating data can learn the nonlinear mapping between
operating conditions and key outputs such as conversion and outlet temperature. While the model
does not encode physical laws explicitly, it can provide accurate predictions within the observed
operating envelope.
From an engineering perspective, such a model is useful for real-time monitoring and what-if analysis.
However, it must be carefully validated, monitored for drift, and constrained to avoid extrapolation
beyond safe operating conditions.
55
7.8 Chapter Summary
This chapter introduced neural networks as flexible nonlinear models for chemical process systems.
The conceptual structure of perceptrons and feedforward networks was explained, followed by a
mathematical formulation of forward propagation, loss functions, and gradient-based optimization.
A synthetic nonlinear reaction system illustrated neural network implementation, and a CSTR case
study demonstrated their practical relevance. Neural networks offer powerful modeling capabilities,
but their use in chemical engineering requires careful validation and physical interpretation.
56