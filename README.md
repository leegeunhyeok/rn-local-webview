# rn-local-webview

React Native 로컬 웹뷰 테스트 코드

## 개요

- Local webview
  - 디바이스 파일 시스템에 웹 페이지 리소스를 저장해두고, 웹뷰에서 해당 파일을 로드하여 화면을 보여주자.
  - react-native-webview fork 하여 커스텀으로 개발함
    - https://github.com/leegeunhyeok/react-native-webview/releases/tag/11.20.1-alpha.1
- How is works
  ```
  (Android 기준)

  - Remote에 업로드 되어있는 번들(zip) 파일을 캐시 데이터 디렉토리에 다운로드
    - Context.getCacheDir()
  - 다운로드 받은 번들 파일 압축 해제 (그림1 참조)
  - `file://${getCacheDir()}/dist/index.html` 경로를 웹뷰에서 열기
  - 스크립트/스타일/에셋파일 모두 파일시스템에 존재하고, 상대경로로 참조하므로 문제 없이 로드 가능 (그림2 참조)
  ```
  - 그림1
    ![fs](https://user-images.githubusercontent.com/26512984/170840984-ce354cc7-c9eb-4cc5-b331-e19ed95c33c9.png)
  - 그림2
    - 디바이스 로컬 파일 시스템에서 파일을 참조하므로 네트워크 상태에 영항을 받지 않음
    - 개발자 도구에서 네트워크 Offline 상태 + 캐시 비활성화한 상태임에도 정상적으로 페이지를 로드하고 있음
    ![browser](https://user-images.githubusercontent.com/26512984/170840981-67031202-b17d-4a30-b4f3-1605eeb545cf.png)
- 테스트 번들
  - Next 기반 웹 애플리케이션 빌드 결과를 static 페이지로 추출 후 압축
  - https://github.com/leegeunhyeok/leegeunhyeok/files/8791678/bundle.zip

## 참고

- https://medium.com/daangn/당근마켓에-웹-프로젝트-배포하기-1-파일-기반-웹뷰-d312b17e697c
