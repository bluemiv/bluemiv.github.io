---
title: Python으로 Upbit RSI 계산하기
description: Python을 활용하여 암호화폐 거래소 Upbit에 있는 종목의 RSI 계산하는 방법에 대해 소개합니다.
date: 2024-08-03 23:19:17 +0900
categories: [ Language, Python ]
tags: [ python, 파이썬, rsi, upbit, 코인, 암호화폐 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/python/2024-08-03-python-upbit-rsi/thumbnail.webp
  alt: Python으로 Upbit RSI 계산하기
---

## 1. RSI 란?

RSI(`Relative Strength Index`, 상대 강도 지수)는 주식, 외환, 암호화폐 등 다양한 금융 자산의 기술적 분석에서 사용되는 모멘텀 지표입니다.
RSI는 특정 기간 동안의 자산 가격의 변동을 바탕으로 자산이 과매수(Overbought) 또는 과매도(Oversold) 상태에 있는지를 알 수 있습니다.

### 1.1. RSI 계산 방법

RSI 계산식은 다음과 같습니다.

1. 상승과 하락 계산
   - 일정 기간 동안의 각 종가 변화를 계산합니다.
   - 상승(U) = 금일 종가 - 전일 종가 (금일 종가가 전일 종가보다 높은 경우)
   - 하락(D) = 전일 종가 - 금일 종가 (금일 종가가 전일 종가보다 낮은 경우)

2. 평균 상승과 평균 하락 계산
   - 일반적으로는 14일 기간을 기준으로 합니다.
   - 평균 상승 = 일정 기간 동안의 상승(U) 합계 / 기간
   - 평균 하락 = 일정 기간 동안의 하락(D) 합계 / 기간

3. RSI 계산
   - RS (Relative Strength) = 평균 상승 / 평균 하락
   - RSI = 100 - (100 / (1 + RS))

이렇게 계산된 RSI 값은 0에서 100 사이의 값을 가지게됩니다. 일반적으로 70 이상이면 과매수, 30 이하이면 과매도로 간주하는데, 이를 참고하여 자신만의 트레이딩 전략을 만들 수 있습니다. 

계산하는 방법에 대해서는 알았으니 Python 코드를 사용하여 작성해보겠습니다.

## 2. 파이썬으로 RSI 계산하기 

pyupbit 라이브러리를 활용할 예정이므로, 우선 pyupbit 의존성을 추가하도록 하겠습니다.

```shell
pip install pyupbit
```

이후, 다음과 같이 코드를 작성합니다.  

```python
def calculate_rsi(ticker, interval='minute1', period=14):
    """
    특정 코인의 RSI를 계산하는 함수.

    Parameters:
    ticker (str): 코인 티커 (예: 'KRW-BTC')
    interval (str): 봉의 간격 ('minute1', 'minute3', 'minute5', 'minute10', 'minute15', 'minute30', 'minute60', 'minute240', 'day')
    period (int): RSI 계산에 사용할 기간 (default: 14)
    """
    # 데이터 불러오기
    df = pyupbit.get_ohlcv(ticker, interval=interval, count=250)

    # 가격 변동 계산
    delta = df['close'].diff()
    delta = delta[1:]

    # 상승과 하락 분리
    gain = delta.clip(lower=0)
    loss = delta.clip(upper=0).abs()

    # 평균 상승과 평균 하락 계산
    avg_gain = gain.ewm(alpha=1 / period).mean()
    avg_loss = loss.ewm(alpha=1 / period).mean()

    # RS 계산
    rs = avg_gain / avg_loss

    # RSI 계산
    rsi = 100 - (100 / (1 + rs))

    return rsi.iloc[-1]


if __name__ == '__main__':
    ticker = 'KRW-BTC'  # 원하는 코인의 티커를 설정
    intervals = ['minute1', 'minute3', 'hour1', 'hour4', 'day']  # 원하는 봉의 간격을 설정

    for interval in intervals:
        rsi = calculate_rsi(ticker, interval=interval)
        print(f"RSI ({interval}): {rsi}")
```

![실행 결과](/assets/img/posts/language/python/2024-08-03-python-upbit-rsi/ex1.webp)
_실행 결과_
