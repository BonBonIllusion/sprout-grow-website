# 全自動芽菜機 - 監控及設定網頁

## TODO List
>硬體端Api<br>
[ ] 上傳Sensor資料<br>
[ ] 上傳排水資訊<br>
[ ] 上傳灑水資訊<br>
[ ] 上傳燈控資訊<br>
[ ] 重置狀態<br>
[ ] 取得排程<br>

>前端Api<br>
[ ] 更新排程<br>
[ ] 取得Sensor資料<br>
[ ] 取得排水&灑水資訊<br>
[ ] 取得燈控資訊<br>

## API說明

### 硬體端Api
#### POST測試
```
POST /?var=str
```
Return:
```
Hello {$var}!
```

#### 上傳Sensor資料
```
GET /pushsensors.php
```
Variables:
```
temp
humid
fan
```
溫度和濕度為必要參數，風扇速度等硬體端實作再說

#### 上傳灑水資訊

#### 上傳排水資訊
```
GET /pushdrain.php
```
沒有變數，訪問時就會記一筆排水紀錄

#### 上傳燈控資訊

#### 重置狀態

### 前端Api
#### 更新排程

#### 取得Sensor資訊

#### 取得排水&灑水資訊

#### 取得燈控資訊