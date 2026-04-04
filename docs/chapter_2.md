# Chapter 2: Python and Data Handling for

Engineers
2.1 Introduction
The effectiveness of machine learning in chemical engineering depends critically on how data are
represented, processed, and interpreted before any model is constructed. Python has emerged
as the dominant language for scientific computing and data-driven modeling due to its clarity,
extensibility, and strong ecosystem of numerical libraries. For chemical engineers, Python serves not
as a replacement for physical modeling, but as a computational environment that enables structured
handling of experimental, simulation, and plant data.
This chapter introduces Python from an engineering perspective, emphasizing data structures
and workflows that align naturally with chemical process variables. The objective is not to teach
programming for its own sake, but to establish the computational literacy required for reliable
machine learning modeling.
2.2 Refresher on Python for Scientific Computing
2.2.1 Variables, Arrays, and Data Types
In Python, variables are symbolic references to objects stored in memory. Unlike strongly typed
engineering software, Python variables do not require explicit type declarations. While this
flexibility accelerates development, it also places responsibility on the engineer to maintain clarity
and consistency.
From a chemical engineering standpoint, numerical data typically fall into three categories:
• Scalars: single values such as temperature, pressure, or flow rate
• V ectors: measurements across time, space, or experimental runs
• Matrices: multivariable datasets representing multiple operating conditions
The NumPy library provides array-based data structures that efficiently represent these quantities.
import numpy as np
# Scalar
temperature = 350.0 # K
# Vector: temperature measurements
17
temperature_profile = np.array([345, 348, 350, 352, 355])
# Matrix: operating conditions (rows = experiments, columns = variables)
operating_conditions = np.array([
[350, 5.0, 2.0],
[360, 5.2, 2.1],
[340, 4.8, 1.9]
])
temperature, temperature_profile, operating_conditions
(350.0,
array([345, 348, 350, 352, 355]),
array([[350. , 5. , 2. ],
[360. , 5.2, 2.1],
[340. , 4.8, 1.9]]))
Each column of the matrix may correspond to a process variable such as temperature, pressure, or
feed concentration, mirroring the structure of experimental datasets.
2.3 Functions and Modular Code
Chemical engineering models often involve repeated calculations: evaluating thermodynamic proper-
ties, computing conversion, or estimating performance metrics. Encapsulating these operations in
functions improves readability and reproducibility.
def reactor_yield(temperature, pressure, feed_conc):
"""
Estimate reactor yield (%) based on operating conditions.
"""
yield_estimate = (
70
+ 0.1 * (temperature - 350)
+ 2.0 * (pressure - 5.0)
- 5.0 * (feed_conc - 2.0) ** 2
)
return yield_estimate
reactor_yield(350, 5.0, 2.0)
70.0
Functions serve as computational analogs to algebraic correlations commonly used in process
design.
18
2.4 Data Handling with NumPy and Pandas
2.4.1 Creating and Manipulating Arrays and DataFrames
While NumPy arrays are ideal for numerical operations, real engineering datasets require labeled
variables and flexible indexing. Pandas provides the DataF rame, a table-like structure that closely
resembles experimental spreadsheets and process historians.
import pandas as pd
data = pd.DataFrame({
"Temperature_K": [ 345, 350, 355, 360],
"Pressure_bar": [ 4.8, 5.0, 5.2, 5.1],
"Feed_Conc_mol_L": [ 1.9, 2.0, 2.1, 2.0],
"Yield_percent": [ 68, 71, 73, 72]
})
data
Temperature_K Pressure_bar Feed_Conc_mol_L Yield_percent
0 345 4.8 1.9 68
1 350 5.0 2.0 71
2 355 5.2 2.1 73
3 360 5.1 2.0 72
Each column corresponds to a physical variable, preserving engineering meaning and unit aware-
ness.
2.5 Missing Data Handling, Scaling, and Normalization
In industrial environments, missing or corrupted sensor data are unavoidable. Ignoring these issues
can lead to biased or unstable models.
# Introduce missing data
data.loc[2, "Pressure_bar"] = np.nan
data
Temperature_K Pressure_bar Feed_Conc_mol_L Yield_percent
0 345 4.8 1.9 68
1 350 5.0 2.0 71
2 355 NaN 2.1 73
3 360 5.1 2.0 72
Handling missing values requires engineering judgment:
19
# Replace missing pressure with mean value
data["Pressure_bar"] = data["Pressure_bar"].fillna(data["Pressure_bar"].mean())
data
Temperature_K Pressure_bar Feed_Conc_mol_L Yield_percent
0 345 4.800000 1.9 68
1 350 5.000000 2.0 71
2 355 4.966667 2.1 73
3 360 5.100000 2.0 72
Scaling is equally important, as ML algorithms are sensitive to variable magnitudes.
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data[["Temperature_K", "Pressure_bar", "Feed_Conc_mol_L"]])
scaled_data
array([[-1.34164079, -1.5430335 , -1.41421356],
[-0.4472136 , 0.3086067 , 0. ],
[ 0.4472136 , 0. , 1.41421356],
[ 1.34164079, 1.2344268 , 0. ]])
Scaling ensures that no single variable dominates due to units rather than physical importance.
2.6 Visualization of Process Data
Visualization is a diagnostic tool, not merely a presentation aid. For engineers, plots reveal
correlations, anomalies, and operating regimes.
import matplotlib.pyplot as plt
plt.scatter(data["Temperature_K"], data[ "Yield_percent"])
plt.xlabel("Temperature (K)" )
plt.ylabel("Yield (%)" )
plt.title("Effect of Temperature on Reactor Yield" )
plt.grid(True)
plt.show()
20
Histograms reveal distributions:
plt.hist(data["Feed_Conc_mol_L"], bins =5)
plt.xlabel("Feed Concentration (mol/L)" )
plt.ylabel("Frequency")
plt.title("Distribution of Feed Concentration" )
plt.show()
21
For multivariable inspection, heatmaps are especially informative.
import seaborn as sns
sns.heatmap(data.corr(), annot =True, cmap ="coolwarm")
plt.title("Correlation Matrix of Process Variables" )
plt.show()
22
2.7 Engineering Case Study: Analyzing Feed Composition and Process
Output
2.7.1 Problem Formulation
Consider a reactor where yield depends on feed composition and operating conditions. The objective
is to explore how variations in feed concentration influence output, prior to any formal modeling.
hypothetical Dataset Generation in python
np.random.seed(1)
n_samples = 120
temperature = np.random.normal(350, 8, n_samples)
pressure = np.random.normal(5.0, 0.4, n_samples)
feed_conc = np.random.normal(2.0, 0.25, n_samples)
23
yield_percent = (
72
+ 0.08 * (temperature - 350)
+ 1.5 * (pressure - 5.0)
- 4.0 * (feed_conc - 2.0) ** 2
+ np.random.normal(0, 1.2, n_samples)
)
process_data = pd.DataFrame({
"Temperature_K": temperature,
"Pressure_bar": pressure,
"Feed_Conc_mol_L": feed_conc,
"Yield_percent": yield_percent
})
process_data.head()
Temperature_K Pressure_bar Feed_Conc_mol_L Yield_percent
0 362.994763 4.990153 1.875447 72.293763
1 345.105949 4.689935 1.922254 72.246204
2 345.774626 5.509502 1.999527 70.094235
3 341.416251 5.786841 1.650845 72.428917
4 356.923261 4.256807 1.784671 70.969881
#Exploratory Data Analysis
sns.pairplot(process_data)
plt.show()
24
From an engineering standpoint:
• Nonlinear dependence on feed concentration is evident
• Yield sensitivity to temperature is moderate
• Pressure effects are secondary but non-negligible
These observations guide model selection in later chapters.
2.8 Chapter Summary
Python provides chemical engineers with a transparent and extensible environment for data handling
and numerical analysis. NumPy arrays represent structured numerical data efficiently, while Pandas
25
DataFrames preserve the physical meaning of process variables. Proper handling of missing data,
scaling, and visualization is essential for reliable machine learning applications. This chapter
establishes the computational foundation required for regression and classification models. In the
next chapter, these tools are applied systematically to regression techniques for process modeling,
where predictive relationships between operating conditions and process outputs are developed and
interpreted.
26