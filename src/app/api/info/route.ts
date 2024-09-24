import {NextResponse} from "next/server";

const floorInfoList = [
  {
    "floorId": "5F", //층 정보
    "sensor": [ //센서 정보
      {
        "sensorId": 's1', //센서 ID
        "sensorArea": '계단', //센서 지역
        "sensorLocation": '천정 위치', //센서 위치
      },
      {
        "sensorId": 's2',
        "sensorArea": '5층 중앙',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's3',
        "sensorArea": '탁구장',
        "sensorLocation": '천정 위치',
      }
    ]
  },
  {
    "floorId": "4F",
    "sensor": [
      {
        "sensorId": 's1',
        "sensorArea": '계단',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's2',
        "sensorArea": '4층 중앙',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's3',
        "sensorArea": '화장실',
        "sensorLocation": '천정 위치',
      }
    ]
  },
  {
    "floorId": "3F",
    "sensor": [
      {
        "sensorId": 's1',
        "sensorArea": '계단',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's2',
        "sensorArea": '3층 중앙',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's3',
        "sensorArea": '화장실',
        "sensorLocation": '천정 위치',
      }
    ]
  },
  {
    "floorId": "2F",
    "sensor": [
      {
        "sensorId": 's1',
        "sensorArea": '계단',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's2',
        "sensorArea": '2층 중앙',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's3',
        "sensorArea": '화장실',
        "sensorLocation": '천정 위치',
      }
    ]
  },
  {
    "floorId": "1F",
    "sensor": [
      {
        "sensorId": 's1',
        "sensorArea": '계단',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's2',
        "sensorArea": '1층 중앙',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's3',
        "sensorArea": '화장실',
        "sensorLocation": '천정 위치',
      }
    ]
  },
  {
    "floorId": "B1",
    "sensor": [
      {
        "sensorId": 's1',
        "sensorArea": '계단',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's2',
        "sensorArea": '지하중앙',
        "sensorLocation": '천정 위치',
      },
      {
        "sensorId": 's3',
        "sensorArea": '강당',
        "sensorLocation": '천정 위치',
      }
    ]
  },
]

export async function GET() {
  return NextResponse.json(floorInfoList);
}