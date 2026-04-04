# Chapter 8: Time Series Modeling in Process

Engineering
8.1 Introduction
Chemical processes are inherently dynamic. Unlike static datasets where observations are indepen-
dent, process data are often collected as time-ordered sequences in which current system behavior
depends on its past states. Examples include temperature evolution in reactors, composition changes
in distillation columns, pressure fluctuations in pipelines, and concentration profiles in biochemical
processes.
Ignoring temporal dependence can lead to misleading models, poor predictions, and unsafe control
decisions. Time series modeling provides a mathematical and computational framework for capturing
system dynamics, forecasting future behavior, and supporting monitoring, control, and optimization
tasks in chemical engineering.
This chapter introduces time series modeling techniques commonly applied in process engineering,
ranging from classical statistical models to modern neural network–based approaches.
8.2 Conceptual Foundations
8.2.1 Nature of Time-Dependent Process Data
A time series is a sequence of observations indexed by time:
{𝑥𝑡}𝑇
𝑡=1
where 𝑥𝑡 represents a measured process variable at time 𝑡. In chemical processes, time dependence
arises due to:
• Material and energy accumulation
• Transport delays
• Reaction kinetics
• Control system feedback
Key characteristics of process time series include autocorrelation, trends, seasonality, and nonlinear-
ity.
57
8.2.2 Autoregressive and Moving Average Models (ARIMA)
ARIMA models describe time series behavior using linear dependence on past observations and past
prediction errors.
An autoregressive model of order 𝑝 (AR) is defined as:
𝑥𝑡 = 𝑐 +
𝑝
∑
𝑖=1
𝜙𝑖𝑥𝑡−𝑖 + 𝜀𝑡
where:
• 𝜙𝑖 are autoregressive coefficients
• 𝜀𝑡 is white noise
A moving average model of order 𝑞 (MA) is:
𝑥𝑡 = 𝜇 +
𝑞
∑
𝑗=1
𝜃𝑗𝜀𝑡−𝑗 + 𝜀𝑡
The ARIMA (𝑝, 𝑑, 𝑞)model combines:
• Autoregression (AR)
• Differencing of order 𝑑 to enforce stationarity
• Moving average (MA)
ARIMA models are widely used in process monitoring and short-term forecasting when system
behavior is approximately linear.
8.2.3 Recurrent Neural Networks and LSTM Models
Many chemical processes exhibit strong nonlinearity and long-term dependencies that linear models
cannot capture. Recurrent Neural Networks (RNNs) address this limitation by explicitly modeling
temporal feedback.
An RNN updates its hidden state according to:
ℎ𝑡 = 𝑓(𝑊ℎℎ𝑡−1 + 𝑊𝑥𝑥𝑡 + 𝑏)
where:
• ℎ𝑡 is the hidden state
• 𝑓(⋅)is a nonlinear activation function
58
However, standard RNNs suffer from vanishing gradients. Long Short-Term Memory (LSTM)
networks overcome this by introducing gated memory cells that regulate information flow over time,
making them well suited for complex process dynamics.
8.3 Python Implementation
8.3.1 Predicting Process Variable Evolution Over Time
We illustrate time series modeling using a hypothetical temperature signal representative of a
continuous chemical process.
import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)
time = np.arange(0, 200)
temperature = 350 + 5 * np.sin(0.1 * time) + np.random.normal(0, 0.5, size =len(time))
plt.plot(time, temperature)
plt.xlabel("Time")
plt.ylabel("Temperature (K)" )
plt.title("hypothetical Process Temperature Time Series" )
plt.show()
59
from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(temperature, order =(2, 1, 2))
model_fit = model.fit()
forecast = model_fit.forecast(steps=20)
plt.plot(time, temperature, label ="Observed")
plt.plot(np.arange(200, 220), forecast, label ="Forecast")
plt.legend()
plt.xlabel("Time")
plt.ylabel("Temperature (K)" )
plt.show()
C:\Users\bin-g\AppData\Local\Programs\Python\Python310\lib\site-packages\statsmodels\base\model.py:607: ConvergenceWarning: Maximum Likelihood optimization failed to converge. Check mle_retvals
warnings.warn("Maximum Likelihood optimization failed to "
60
This approach captures short-term dynamics effectively when the process operates near steady
conditions.
8.4 Engineering Case Study
8.4.1 Forecasting Temperature and Concentration Profiles in a Continuous Reactor
Consider a continuous stirred-tank reactor (CSTR) where temperature and concentration evolve due
to reaction kinetics and heat exchange. Accurate forecasting is essential for safety and control.
8.5 Chapter Summary
Time series modeling is essential for understanding and predicting the dynamic behavior of chemical
processes. This chapter introduced:
• The nature of time-dependent process data.
• Classical ARIMA models for linear dynamic systems.
• Recurrent neural networks and LSTM architectures for nonlinear dynamics.
• Practical implementation of time series forecasting in Python.
61
• A reactor-based case study illustrating engineering relevance.
In the next chapter, we extend these ideas to Model Validation, Uncertainty, and Interpretability.
62