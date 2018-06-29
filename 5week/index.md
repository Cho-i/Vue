# 05 화면을 개발하기 위한 기본 지식과 팁 -템플릿 & 프로젝트 구성

## 05-1 뷰 템플릿

### 뷰 템플릿이란?

뷰의 템플릿은 HTML, CSS 등의 마크업 속성과 뷰 인스턴스에서 정으한 데이터 및 로직들을 연결하여 사용자가 브라우저에서 볼 수 있는 형태의 HTML로 변환해 주는 속성.

1. ES5에서 뷰 인스턴스의 template속성을 활용
2. ES6 싱글 파일 컴포넌트 체계 template 코드 활용



**ES5에서 template속성**

```javascript
new Vue({
    template:'<p>Hello{{message}}</p>'
});
```

사용자가 볼 수는 없지만 라이브러리 내부적으로 template 속성에서 정의한 마크업 + 뷰 데이터를 가상 돔 기반의 render() 함수로 변환함. 변환된 render() 함수는 최종적으로 사용자가 볼 수 있게 화면을 그리는 역할을 함.



template 속성을 사용하지 않은 경우

```html
<div id="app">
    <h3>{{message}}</h3>
</div>
<script>
    new Vue({
        el:'#app',
        data:{
            message:'Hello Vue!'
        }
    });
</script>
```



template 속성을 사용한 경우

```html
<div id="app">
</div>
<script>
    new Vue({
        el:'#app',
        data:{
            message:'Hello Vue!'
        },
        template:'<h3>{{message}}</h3>'
    });
</script>
```

template 속성을 사용하지 않은 경우는 먼저 <h3>{{message}}</h3>를 화면에 표시하고, 인스턴스가 생성되면 message의 값을 Hello Vue!로 치환.

template 속성을 사용한 경우는 <div id="app">에 아무런 내용이 없다가 인스턴스가 생성되면 <h3>Hello Vue!</h3>가 화면에 달라붙어 표시됨.



**ES6 싱글 파일 컴포넌트 체계 template 코드**

```vue
<template>
	<p>Hello {{message}}</p>
</template>
```



템플릿에서 사용하는 뷰의 속성과 문법은 다음과 같음.

- 데이터 바인딩
- 자바스크립트 표현식
- 디렉티브
- 이벤트 처리
- 고급 템플릿 기법



### 데이터 바인딩

데이터 바인딩은 HTML 화면 요소를 뷰 인스턴스의 데이터와 연결하는것.

주요 문법으로는 {{}} 문법과 v-bind 속성이 있음.



**{{}} 콧수염 괄호**

{{}}는 뷰 인스턴스의 데이터를 HTML 태그에 연결하는 가장 기본적인 텍스트 삽입 방식.

```html
<div id="app">
    <h3>{{message}}</h3>
</div>
<script>
    new Vue({
        el:'#app',
        data:{
            message:'Hello Vue!'
        }
    });
</script>
```

위 코드는 data 속성의 message 속성 값인 Hello Vue!를 <div> 태그 안의 {{message}}에 연결하여 화면에 나타내는 코드. 여기서 만약 data 속성의 message 값이 바뀌면 뷰 반응성에 의해 화면이 자동으로 갱신.

*만약 뷰 데이터가 변경되어도 값을 바꾸고 싶지 않다면 v-once 속성을 사용가능 하나, 같은 노드의 바인딩에도 영향을 미친다는 점 유의.



**v-bind**

v-bind는 아이디, 클래스, 스타일 등의 HTML 속성값에 뷰 데이터 값을 연결할 때 사용하는 데이터 연결 방식. 형식은 v-bind 속성으로 지정할 HTML 속성이나 props 속성 앞에 접두사로 붙여줌.

