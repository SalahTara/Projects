import streamlit as st
from datetime import date

import yfinance as yf
from prophet import Prophet
from prophet.plot import plot_plotly
from plotly import graph_objs as go	


START = "2015-01-01"
TODAY = date.today().strftime("%Y-%m-%d")

st.title("Stock Predictor App")

stocks = ("BTC-CAD", "GOOG", "MSFT", "AMZN")
selected_stock = st.selectbox("Select Data Set for Prediction", stocks)

n_years = st.slider("Years of Prediction: ", 1 , 4)
period = n_years * 365

@st.cache_data
def load_data(ticker):
	data = yf.download(ticker, START, TODAY)
	data.reset_index(inplace=True)
	return data

data_load_state = st.text("Load Data...")
data = load_data(selected_stock)
data_load_state.text("Done!")

st.subheader('Raw Data')
st.write(data.tail())

def plot_raw_data():
	figure = go.Figure()
	figure.add_trace(go.Scatter(x=data['Date'], y=data['Open'], name='Stock-Open'))
	figure.add_trace(go.Scatter(x=data['Date'], y=data['Close'], name='Stock-Close'))
	figure.layout.update(title_text = "Time Series Data", xaxis_rangeslider_visible = True)
	st.plotly_chart(figure)
plot_raw_data()

# Forecasting
df_train = data[['Date', 'Close']]
df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

m = Prophet()
m.fit(df_train)
future = m.make_future_dataframe(periods = period)
forecast = m.predict(future)

st.subheader('Forecast Data')
st.write(forecast.tail())

st.write("Forecast Data")
figure1 = plot_plotly(m, forecast)
st.plotly_chart(figure1)

st.write("Forecast Components")
figure2 = m.plot_components(forecast)
st.write(figure2)