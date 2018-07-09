## 05-2 뷰 프로젝트 구성 방법

###  HTML 파일에서 뷰 코드 작성 시의 한계점

```html
<div id="app">
    <my-component></my-component>
    <your-component></your-component>
</div>
<script>
    Vue.component('my-component',{
        template: '<div><h5>complex markup</h5><ul><li><button>list1</button></li><li><p style="color:blue">list2</p></li><li><strong>list3</strong></li></ul></div>'
    });
    Vue.component('your-component',{
        template:'<div><span style="font-size:1.2em;"><button>{{message}}</button></span></div>'
    });
    new Vue({
        el:'#app',
        data:{
            message:'click this button'
        }
    });
</script>
```

-> 미리 예상, 오탈자, 알아보기 어렵.



### 싱글 파일 컴포넌트 체계

문제점을 해결하는 방법이 싱글파일 컴포넌트 체계. vue 파일로 프로젝트 구조를 구성하는 방식. 확장자 .vue파일 1개는 뷰 애플리케이션을 구성하는 1개의 컴포넌트와 동일.

**.vue 파일은 아래와 같은 기본구조**

```vue
<template>
	<!-- HTML 태그 내용 -->
</template>
<script>
    export default{
        //자바스크립트 내용
    }
</script>
<style>
	/* CSS 스타일 내용 */
</style>
```

template - 화면에 표시할 요소들을 정의하는 영역 ex) HTML+뷰 데이터 바인딩

script - 뷰 컴포넌트의 내용을 정의하는 영역 ex)template, data, methods 등

script의 export default{}코드는 ES6의 자바스크립트 모듈화와 관련된 문법. 여기서는 쉽게 export default{} 안에는 해당 컴포넌트 동작을 정의하는 코드를 추가한다는 것만...

style - 템플릿에 추가한 HTML 태그의 CSS 스타일을 정의하는 영역

**<your-component>내용**

```vue
<template>
	<div>
    	<span>
    		<button>{{message}}</button>
    	</span>
    </div>
</template>
<script>
    export default{
        data:{
            message:'click this button'
        }
    }
</script>
<style>
    span{font-size:1.2em;}
</style>
```

이런방식으로 <template> 태그 안에는 HTML 태그와 뷰 데이터 바인딩 값들을 넣고, <script> 태그에는 뷰 컴포넌트에서 사용할 속성들을 정의.



### 뷰CLI

싱글 파일 컴포넌트 체계를 사용하기 위해서는 .vue 파일을 웹 브라우저가 인식할 수 있는 형태의 파일로 변환해 주는 웹팩이나 브라우저리파이와 같은 도구가 필요.

-> CLI 도구를 제공.



뷰 CLI 명령어

뷰 개발을 시작 할 때 초기 프로젝트를 쉽게 구성해 주는 명령어는 vue init 임. vue init 명령어를 입력할 때 사용하는 프로젝트 템플릿 종류는 다음과 같이 6가지.

| 템플릿 종류                | 설명                                                         |
| -------------------------- | ------------------------------------------------------------ |
| vue init webpack           | 고급 웹팩 기능을 활용한 프로젝트 구성 방식. 테스팅, 문법 검사 등을 지원 |
| vue init webpack-simple    | 웹팩 최소 기능을 활용한 프로젝트 구성 방식. 빠른 화면 프로토타이핑용 |
| vue init browserify        | 고급 브라우저리파이 기능을 활용한 프로젝트 구성 방식. 빠른 화면 프로토타이핑용 |
| vue init browserify-simply | 브라우저리파이 최소 기능을 활용한 프로젝트 구성 방식. 빠른 화면 프로토타이핑용 |
| vue init simple            | 최소 뷰 기능만 들어간 HTML 파일 1개 생성                     |
| vue init pwa               | 웹팩 기반의 프로그레시브 웹 앱(PWA, Progressive Web App) 기능을 지원하는 뷰 프로젝트 |

