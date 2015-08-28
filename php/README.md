# 全自動芽菜機 - 監控及設定網頁

## TODO List
### 硬體端Api
- [x] 上傳Sensor資料
- [x] 上傳灑水資訊
- [x] 上傳排水資訊
- [x] 上傳燈控資訊
- [ ] 重置狀態
- [x] 取得排程

### 前端Api
- [x] 取得Sensor資料
- [ ] 取得排水&灑水資訊
- [ ] 取得燈控資訊
- [ ] 更新排程




## API說明

Test server: ```dchome.sytes.net/sprout-grow```

### 硬體端Api
#### GET測試
```
GET /?var=str
```
Return:
```
Hello {$var}! Server time: {Server time in unix epoch}
```

#### 上傳Sensor資料
```
GET /push_sensor.php
```
```
Variables:
  temp
  humid
  fan
```
溫度和濕度為必要參數，風扇速度等硬體端實作再說

Return:
```
Success: 0
Error: "Connection failed: Error msg."
```

#### 上傳灑水資訊
##### 開始灑水
```
GET /push_spour.php
```
Return:
```
Success: session id
Error: "Connection failed: Error msg."
```
開始灑水時先訪問一次，會記錄一筆開始資料並回傳該次紀錄的id

##### 結束灑水
```
GET /push_spour.php?id=id&stop=1
```
Return:
```
Success: 0
Error: "Connection failed: Error msg."
```
結束灑水時需傳入id，會更新該次紀錄的結束時間


#### 上傳排水資訊
```
GET /push_drain.php
```
沒有參數，訪問時就會記一筆排水紀錄

Return:
```
Success: 0
Error: "Connection failed: Error msg."
```

#### 上傳燈控資訊
Url為
```
GET /push_light.php
```
其餘和上傳灑水資訊相同

#### 重置狀態

#### 取得排程
```
GET /get_schedule_string.php
```
Return:
```
Success: schedule string
Error: "Connection failed: Error msg."
```
Schedule string: (以逗點分隔)
```
SS = T,S,C,WD,WM,LD,LM,OS
T:伺服器時間Time，(the number of seconds since the Unix Epoch)
S:泡水總時程Soak(hour)
C:多久換水Changing water(hour)
WD:灑水總時程Water During(day)
WM:灑水模式Water Mode(water mode)
LD:第幾天開始綠化Light Date(date)
LM:綠化模式Light Mode(light mode)
OS:是否有排程正在進行On Schedule(boolean)
```
Water and Light mode: (可有多組數據，每組數據以#標示)
```
WM = #HHMMA#HHMMA...
HH:時
MM:分
A:動作
  - For Water
	  - W灑水(water)
	  - P淹水(pour)
  - For Light
	  - O開燈(Open)
	  - C關燈(Close)
```
### 前端Api
#### 取得單筆資訊(sensors、排水)
```
GET \get_single_data.php
```
```
Variables:
mode(sensors/drain)
start(start time in unix timestamp)
end(end time in unix timestamp)
```
Return:
```
Single data in json form.
```

#### 取得期間資訊(灑水、燈控)
```
GET \get_duration_data.php
```
```
Variables:
mode(spour/light)
start(start time in unix timestamp)
end(end time in unix timestamp)
```
Return:
```
Duration data in json form.
```

#### 更新排程