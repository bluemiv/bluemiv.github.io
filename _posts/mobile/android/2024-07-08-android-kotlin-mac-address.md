---
title: Kotlin Android에서 Mac 주소를 가져오는 방법
description: 네트워크 장치의 Mac 주소를 가져오는 것은 네트워크 관련 기능을 구현하는 데 종종 필요합니다. 이 글에서는 Mac 주소를 가져오는 방법을 설명합니다.
date: 2024-07-08 18:33:30 +0900
last_modified_at: 2024-07-08 18:33:30 +0900
categories: [ Mobile, Android ]
tags: [ android, 안드로이드, 코틀린, kotlin, jetpack compose, mac address, network ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/mobile/android/2024-07-08-android-kotlin-mac-address/thumbnail.webp
  alt: Kotlin Android에서 Mac 주소를 가져오는 방법
---

## 1. Mac 주소란?

Mac 주소(Media Access Control Address)는 네트워크 인터페이스에 할당된 고유한 식별자 값 입니다. Mac 주소를 표기할 때는 12개의 16진수로 구성되며, 2자리씩 나눠 :로 구분합니다.
예를 들어 `00:0a:95:9d:68:16`과 같은 형태를 가집니다.

## 2. AndroidManifest.xml 권한 추가

Android 6.0 (`Marshmallow`)부터는 보안상의 이유로 Mac 주소를 가져오는 것이 제한되어, WiFi 연결 상태에서 Mac 주소를 가져오는 방법을 사용해야 합니다.

Mac 주소를 가져오기 위해서는 `ACCESS_WIFI_STATE` 권한이 필요합니다. 따라서, `AndroidManifest.xml` 파일에 아래과 같이 권한을 추가합니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

    <!-- 생략 -->
</manifest>
```

## 3. Mac 주소 가져오기

Mac 주소를 가져오는 기능을 구현하기 위해 NetworkUtils를 파일을 생성했습니다. 그리고 아래와 같이 `getMacAddress()` 메소드를 생성합니다.

```kotlin
import android.util.Log
import androidx.annotation.RequiresPermission
import java.net.NetworkInterface
import java.net.SocketException
import java.util.Collections


object NetworkUtils {

    @RequiresPermission(android.Manifest.permission.ACCESS_WIFI_STATE)
    fun getMacAddress(): String {
        try {
            val all: List<NetworkInterface> =
                Collections.list(NetworkInterface.getNetworkInterfaces())
            for (nif in all) {
                if (!nif.name.equals("wlan0", ignoreCase = true)) continue

                val macBytes = nif.hardwareAddress ?: return ""

                val res1 = StringBuilder()
                for (b in macBytes) {
                    res1.append(String.format("%02X:", b))
                }

                if (res1.isNotEmpty()) {
                    res1.deleteCharAt(res1.length - 1)
                }
                return res1.toString()
            }
        } catch (ex: SocketException) {
            Log.e("NetworkUtils", "Error: ${ex.message}")
        }
        return ""
    }

}
```

위 코드는 NetworkInterface에서 `wlan0`의 MAC Address를 가지고 오는 코드입니다.
만약, 특정 NetworkInterface의 MAC 주소를 가지고 오려면, 인자(Argument)를 받아서 처리하는 것도 좋은 방법일거 같습니다.

```kotlin
@RequiresPermission(android.Manifest.permission.ACCESS_WIFI_STATE)
fun getMacAddress(interfaceName: String): String {
    try {
        val all: List<NetworkInterface> =
            Collections.list(NetworkInterface.getNetworkInterfaces())
        for (nif in all) {
            if (!nif.name.equals(interfaceName, ignoreCase = true)) continue
            // ...
        }
    // ...
```

## 4. UI 구성

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import com.example.ui.theme.MyApplicationTheme
import com.example.utils.NetworkUtils

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val macAddress =NetworkUtils.getMacAddress()

            MyApplicationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Row(modifier = Modifier
                        .padding(innerPadding)
                        .fillMaxSize()) {
                        Text(
                            text = "MAC Address: $macAddress",
                            style = TextStyle(fontWeight = FontWeight.Bold)
                        )
                    }
                }
            }
        }
    }
}
```

그냥 단순히 Text로 Mac Address를 출력하는 코드입니다.

## 5. 결과

![mac address 출력](/assets/img/posts/mobile/android/2024-07-08-android-kotlin-mac-address/result.webp)
_mac address 출력_
