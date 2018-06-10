# 03-2 뷰 컴포넌트

## **컴포넌트란?**

컴포넌트(Component)란 조합하여 화면을 구성할 수 있는 블록(화면의 특정 영역)을 의미.

컴포넌트를 활용하면 화면을 빠르게 구조화하여 일괄적인 패턴으로 개발 할 수 있음.

화면 영역을 컴포넌트로 쪼개서 재활용할 수 있는 형태로 관리하면 나중에 코드를 다시 사용하기가 훨씬 편리.

또 모든 사람들이 정해진 방식대로 컴포넌트를 등록하거나 사용하게 되므로 남이 작성한 코드를 직관적으로 이해할 수 있음.



뷰에서는 웹 화면을 구성할 때 흔히 사용하는 내비게이션 바, 테이블, 리스트, 인풋박스등과 같은 화면 구성 요소들을 잘게 쪼개어 컴포넌트로 관리함.

![](https://joshua1988.github.io/images/posts/web/vuejs/components.png)

그림에서 왼쪽은 웹페이지 한 화면의 영역을 각각 역할별로 분할한 그림, 오른쪽은 각각 분할된 영역 간의 관계를 도식화한 그림. 여기서 각각 분할된 영역은 컴포넌트를 의미.

이러한 컴포넌트 간의 관계는 뷰에서 화면을 구성하는 데 매우 중요한 역할을 하며, 웹 페이지 화면을 설계할 때도 이와 같은 골격을 유지하면서 설계를 해야함. 컴포넌트 간의 관계는 자료구조의 트리모양과 유사.



> 트리란 컴퓨터 자료구조 중 하나로, 노드끼리의 연결이 부모 - 자식의 구조를 따름.
>
> 전체적인 모양이 나무와 비슷해서 트리라고 부름. 트리는 윈도우 파일 시스템 체계를 비롯하여 각종 데이터베이스에 활용되고 있고 뷰에서도 컴포넌트를 이해할 때 필요한 개념.



**<u>즉, 화면에 비춰지는 뷰의 단위를 쪼개어 재활용이 가능한 형태로 관리하는 것이 컴포넌트</u>**



## **컴포넌트 등록하기**

컴포넌트를 등록하는 방법은 전역과 지역의 두 가지가 있음.

지역(Local) 컴포넌트는 특정 인스턴스에서만 유효한 범위를 갖고, 전역(Global) 컴포넌트는 여러 인스턴스에서 공통으로 사용할 수 있음.

지역은 특정 범위 내에서만 사용할 수 있고, 전역은 뷰로 접근 가능한 모든 범위에서 사용할 수 있음.



**전역 컴포넌트 등록**

전역 컴포넌트는 뷰 라이브러리를 로딩하고 나면 접근 가능한 Vue 변수를 이용하여 등록함.

전역 컴포넌트를 모든 인스턴스에 등록하려면 Vue 생성자에서 .component()를 호출하여 수행하면 됨.

```javascript
Vue.component('컴포넌트 이름',{
//컴포넌트 내용
});
```

전역 컴포넌트 등록 형식에는 컴포넌트 이름과 컴포넌트 내용이 있음.

컴포넌트 이름은 template속성에서 사용할 HTML 사용자 정의 태그 이름을 의미함.

태그 이름의 명명 규칙은 HTML 사용자 정의 태그 스펙에서 강제하는 '모두 소문자'와 '케밥 기법'을 따르지 않아도됨. 그러나 이 규칙을 따르는 것이 좋음.

> 케밥 기법 : 변수가 단어의 조합으로 이루어져 있을 때, 단어와 단어 사이를 -로 잇는 변수 명명 방식(예 : my-component나 my-global-component 등)



컴포넌트 태그가 실제 화면의 HTML요소로 변환될 때 표시될 속성들을 컴포넌트 내용에 작성.

컴포넌트 내용에는 template, data, methods 등 인스턴스 옵션 속성을 정의할 수 있음.



[exam1)](https://cho-i.github.io/Vue/2week/exam1.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <button>컴포넌트 등록</button>
            <!-- 전역 컴포넌트 표시 -->
      		<my-component></my-component>
            <!--// 전역 컴포넌트 표시 -->
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        //전역 컴포넌트 등록
        Vue.component('my-component', {
            template: '<div>전역 컴포넌트가 등록되었습니다!</div>'
        });
        //Vue 인스턴스 생성
        new Vue({
            el: '#app'
        });
        </script>
    </body>
</html>
```



전역 컴포넌트가 그려질 때의 실제 코드

```html
 <div id="app">
     <button>컴포넌트 등록</button>
     <!-- 등록한 my-component가 최종적으로 변환된 모습 -->
     <div>전역 컴포넌트가 등록되었습니다!</div>
</div>
```



**지역 컴포넌트 등록**

지역 컴포넌트 등록은 전역 컴포넌트 등록과는 다르게 인스턴스에 components 속성을 추가하고 등록할 컴포넌트 이름과 내용을 정의하면 됨.

```javascript
new Vue({
    components:{
        '컴포넌트 이름':컴포넌트 내용
    }
});
```

컴포넌트 이름은 전역 컴포넌트와 마찬가지로, 컴포넌트 내용은 컴포넌트 태그가 실제 화면 요소로 변환될 때의 내용을 의미.



[exam2)](https://cho-i.github.io/Vue/2week/exam2.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <button>컴포넌트 등록</button>
            <!-- 지역 컴포넌트 표시 -->
      		<my-local-component></my-local-component>
            <!--// 지역 컴포넌트 표시 -->
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        var cmp = {
            // 컴포넌트 내용
            template: '<div>지역 컴포넌트가 등록되었습니다!</div>'
        };

        new Vue({
            el: '#app',
            components: {
            'my-local-component': cmp
            }
        });
        </script>
    </body>
</html>

```

변수 cmp에는 화면에 나타낼 컴포넌트의 내용을 정의.



## 지역 컴포넌트와 전역 컴포넌트의 차이

지역 컴포넌트와 전역 컴포넌트의 차이점을 이해하기 위해서는 인스턴스의 유효 범위를 이해해야함.

인스턴스의 유효범위란 HTML의 특정 범위 안에서만 인스턴스의 내용이 유효한 것.

[exam3)](https://cho-i.github.io/Vue/2week/exam3.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <h3>첫 번째 인스턴스 영역</h3>
            <my-global-component></my-global-component>
            <my-local-component></my-local-component>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        // 전역 컴포넌트 등록
        Vue.component('my-global-component', {
            template: '<div>전역 컴포넌트 입니다.</div>'
        });

        // 지역 컴포넌트 내용
        var cmp = {
            template: '<div>지역 컴포넌트 입니다.</div>'
        };

        new Vue({
            el: '#app',
            // 지역 컴포넌트 등록
            components: {
            'my-local-component': cmp
            }
        });
        </script>
    </body>
</html>

```



인스턴스를 하나더 생성하고 해당 인스턴스에서 지역, 전역 컴포넌트를 모두 표시

[exam4)](https://cho-i.github.io/Vue/2week/exam4.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <h3>첫 번째 인스턴스 영역</h3>
            <my-global-component></my-global-component>
            <my-local-component></my-local-component>
        </div>
        <hr>
        <div id="app2">
            <h3>두 번째 인스턴스 영역</h3>
            <my-global-component></my-global-component>
            <my-local-component></my-local-component>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        // 전역 컴포넌트 등록
        Vue.component('my-global-component', {
            template: '<div>전역 컴포넌트 입니다.</div>'
        });

        // 지역 컴포넌트 내용
        var cmp = {
            template: '<div>지역 컴포넌트 입니다.</div>'
        };

        new Vue({
            el: '#app',
            // 지역 컴포넌트 등록
            components: {
            'my-local-component': cmp
            }
        });

        // 두 번째 인스턴스
        new Vue({
            el: '#app2'
        });
        </script>
    </body>
</html>
```

첫 번째 인스턴스 영역에는 전역, 지역 컴포넌트가 모두 정상적으로 나타남.

두 번째 인스턴스 영역에는 전역 컴포넌트만 나타나고, 지역 컴포넌트는 나타나지 않음.

전역 컴포넌트와 지역 컴포넌트의 유효 범위가 다르기 때문.

전역 컴포넌트는 인스턴스를 새로 생성할 때마다 인스턴스에 components속성으로 등록할 필요 없이 한번 등록하면 어는 인스턴스에서든지 사용할 수 있음.

반대로 지역 컴포넌트는 새 인스턴스를 생성할 때마다 등록해 줘야함.

<my-local-component></my-local-component> 태그는 두 번째 인스턴스의 유효 범위 안에 있더라도 이 컴포넌트가 등록된 첫 번째 유효범위를 벗어나기 때문에 브라우저에서는 HTML 사용자 정의 태그로 인식, 뷰에서는 해당 컴포넌트를 제대로 등록했는지 물어보는 오류를 표시. 



# 03-3 뷰 컴포넌트 통신

## 컴포넌트 간 통신과 유효 범위

앵귤러1이나 백본(Backbone.js)과 같은 초창기 자바스크립트 프레임워크에서는 한 화면을 1개 뷰(View)로 간주함.

따라서 한 화면의 데이터를 해당 화면 영역 어디서든지 호출할 수 있었음.

하지만 뷰(Vue.js)의 경우 컴포넌트로 화면을 구성하므로 같은 웹 페이지라도 데이터를 공유할 수 없음. 그 이유는 컴포넌트 마다 자체적으로 고유한 유효범위(Scope)를 갖기 때문. 이는 뷰 프레임워크 내부적으로 정의된 특징.

따라서 각 컴포넌트의 유효 범위가 독립적이기 때문에 다른 컴포넌트의 값을 직접적으로 참조할 수가 없음.

[exam5)](https://cho-i.github.io/Vue/2week/exam5.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <my-component1></my-component1>
            <my-component2></my-component2>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        // 첫 번째 컴포넌트 내용
        var cmp1 = {
            template: '<div>첫 번째 지역 컴포넌트 : {{ cmp1Data }}</div>',
            data: function() {
                return {
                    cmp1Data : 100
                }
            }
        };

        // 두 번째 컴포넌트 내용
        var cmp2 = {
            template: '<div>두 번째 지역 컴포넌트 : {{ cmp2Data }}</div>',
            data: function() {
                return {
                    cmp2Data : cmp1.data.cmp1Data
                }
            }
        };

        new Vue({
            el: '#app',
            // 지역 컴포넌트 등록
            components: {
                'my-component1': cmp1,
                'my-component2': cmp2
            }
        });
        </script>
    </body>
</html>
```

이 예제는 2개의 지역 컴포넌트를 등록하고, 한 컴포넌트에서 다른 컴포넌트의 값을 직접 참조하는 예제.

my-component2 컴포넌트 내용에서 {{cmp2Data}}는 my-component1 컴포넌트의 data.cmp1Data를 참조하고 있음. 자바스크립트의 객체 참조 방식을 생각해 보면 참조 값 100이 화면에 표시되어야 함. 하지만 아무것도 표시하지 않았음.

{{cmp2Data}}에 아무 값도 출력되지 않은 이유는 my-component2에서 my-component1의 값을 직접 참조할 수 없기 때문. 즉, 앞에서 언급했듯이 컴포넌트의 유효 범위로 인해 다른 컴포넌트의 값을 직접 접근하지 못하기 때문.

이렇게 다른 컴포넌트의 값을 참조하지 못하기 때문에 생기는 특징도 있음. 뷰에서 미리 정의해 놓은 데이터 전달 방식에 따라 일관된 구조로 애플리케이션을 작성하게 됨. 그러므로 개발자 개개인의 스타일대로 구성 되지 않고, 애플리케이션이 모두 동일한 데이터 흐름을 갖음. 이렇게 되면 다른 사람의 코드를 빠르게 파악할 수 있어 협업하기에도 좋음.



## 상하위 컴포넌트 관계

컴포넌트는 각각 고유한 유효범위를 갖고 있기 때문에 직접 다른 컴포넌트의 값을 참조할 수 없음.

따라서 뷰 프레임어크 자체에서 정의한 컴포넌트 데이터 전달 방법을 따라야 함. 가장 기본적인 데이터 전달 방법은 바로 상위(부모) - 하위(자식) 컴포넌트 간의 데이터 전달 방법.

상위 - 하위 컴포넌트란 트리 구조에서 부모 노드, 자식 노드처럼 컴포넌트 간의 관계가 부모, 자식으로 이루어진 컴포넌트를 의미 지역 또는 전역 컴포넌트를 등록하면 등록된 컴포넌트는 자연스럽게 하위 컴포넌트(자식 컴포넌트)가 됨. 그리고 하위 컴포넌트를 등록한 인스턴스는 상위 컴포넌트(부모 컴포넌트)가 됨.



![](https://kr.vuejs.org/images/props-events.png)

상위에서 하위로는 props라는 특별한 속성을 전달함. 그리고 하위에서 상위로는 기본적으로 이벤트만 전달할 수 있음.

- 부모 -> 자식 : props down
- 자식 -> 부모 : events up



## 상위에서 하위 컴포넌트로 데이터 전달하기

**props 속성**

props는 상위컴포넌트에서 하위 컴호넌트로 데이터를 전달할 때 사용하는 속성.

```javascript
Vue.component('child-component',{
    props:['props 속성 이름']
});
```

props 속성 정의 다음 상위 컴포넌트의 HTML 코드에 등록된 child-component 컴포넌트 태그에 v-bind 속성을 추가.

```html
<child-component v-bind:props 속성 이름="상위 컴포넌트의 data 속성"></child-component>
```

v-bind 속성의 왼쪽 값으로 하위 컴포넌트에서 정의한 props 속성을 넣고, 오른쪽 값으로 하위 컴포넌트에 전달할 상위 컴포넌트의 data 속성을 지정.

[exam6)](https://cho-i.github.io/Vue/2week/exam6.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <!-- 팁 : 오른쪽에서 왼쪽으로 속성을 읽으면 더 수월합니다. -->
            <!-- 4.HTML에 컴포넌트 태그를 추가.<child-component>태그의 v-bind 속성을 보면, v-bind:propsdata="message"는 상위 컴포넌트의 message 속성 값인 Hello Vue! passed from Parent Component 텍스트를 하위 컴포넌트의 propsdata로 전달  -->
            <child-component v-bind:propsdata="message"></child-component>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        //2.Vue.component()를 이용하여 하위 컴포넌트인 child-component를 등록.
        Vue.component('child-component', {
            //3.child-component의 내용에 props 속성으로 propsdata를 정의.
            props: ['propsdata'],
            //5.child-component의 template 속성에 정의된 <p>{{ propsdata }}</p>는 Hello Vue! passed from Parent Component가 됨.
            template: '<p>{{ propsdata }}</p>',
        });
        //1. new Vue()로 인스턴스를 하나 생성.
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue! passed from Parent Component'
            }
        });
        </script>
    </body>
</html>
```

예제 코드에서는 child-component를 전역으로 등록한 것 이외에 딱히 상위 컴포넌트를 지정하지 않았음. 그럼에도 불구하고 뷰 인스턴스 안에 마치 상위 컴포넌트가 존재하는 것처럼 하위 컴포넌트로 props를 내려보냈음. 그 이유는 컴포넌트를 등록함과 동시에 뷰 인스턴스 자체가 상위 컴포넌트가 되기 때문.

인스턴스에 새로운 컴포넌트를 등록하면 기존에 있는 컴포넌트는 상위 컴포넌트가 되고, 새로 등록된 컴포넌트는 하위 컴포넌트가 됨. 이렇게 새 컴포넌트를 등록한 인스턴스를 최상위 컴포넌트라고 부름.



## 하위에서 상위 컴포넌트로 이벤트 전달하기

**이벤트 발생과 수신**

앞에서 배운 props는 상위에서 하위 컴포넌트로 데이터를 전달하는 방식. 반대로 하위 컴포넌트에서 상위 컴포넌트로의 통신은? 이벤트를 발생시켜(event emit) 상위 컴포넌트에 신호를 보내면 됨. 상위 컴포넌트에서 하위 컴포넌트의 특정 이벤트가 발생하기를 기다리고 있다가 하위 컴포넌트에서 특정 이벤트가 발생하면 상위 컴포넌트에서 해당 이벤트를 수신하여 상위 컴포넌트의 메서드를 호출하는 것.



> 하위에서 상위 컴포넌트로 데이터를 전달할 수는 없나요?
>
> 뷰 공식 사이트의 이벤트 발생 사용 방법에서는 하위에서 상위로 데이터를 전달하는 방법을 다루지 않음.
>
> 왜냐면 이는 뷰의 단방향 데이터 흐름에 어긋나는 구현 방법이기 때문. 하지만 향후에 복잡한 뷰 애플리케이션을 구축할 때 이벤트 버스(Event Bus)를 이용하여 데이터를 전달해야 할 경우가 있기 때문에 이벤트 인자로 데이터를 전달하는 방법에 대햐서는 이벤트 버스 부분에서 다룸.



**이벤트 발생과 수신 형식**

이벤트 발생과 수신은 $emit()과 v-on:속성을 사용하여 구현함.

```javascript
//이벤트 발생
this.$emit('이벤트명');
```

```html
//이벤트 수신
<child-component v-on:이벤트 명="상위 컴포넌트의 메서드명"></child-component>
```

$emit()을 호출하면 괄호 안에 정의된 이벤트가 발생함. 그리고 일반적으로 호출하는 위치는 하위 컴포넌트의 특정 메서드 내부. 따라서 호출할 때 사용하는 this는 하위 컴포넌트를 가리킴.

호출한 이벤트는 하위 컴포넌트를 등록하는 태그에서 v-on:으로 받음. 하위 컴포넌트에서 발생한 이벤트명을 v-on: 속성에 지정하고, 속성의 값에 이벤트가 발생했을 때 호출될 상위 컴포넌트의 메서드를 지정.

[exam7)](https://cho-i.github.io/Vue/2week/exam7.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <!-- 3.shwo-log 이벤트는 child-component에 정의한 v-on:show-log에 전달되고, v-on:show-log의 대상 메서드인 최상위 컴포넌트의 메서드 printText()가 실행됨 -->
            <child-component v-on:show-log="printText"></child-component>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        Vue.component('child-component', {
            //1. show버튼을 클릭하면 클릭 이벤트 v-on:click="showLog"에 따라 showLog() 메서드가 실행됨.
            template: '<button v-on:click="showLog">show</button>',
            //2.showLog()메서드 안에 this.$emit('show-log')가 실행되면서 show-log 이벤트가 발생.
            methods: {
                showLog: function() {
                this.$emit('show-log');
                }
            }
        });

        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue! passed from Parent Component'
            },
            methods: {
                //4.printText()는 received an event라는 로그를 출력하는 메서드이므로 마지막으로 콘솔에 로그가 출력.
                printText: function() {
                    console.log("received an event");
                }
            }
        });
        </script>
    </body>
</html>

```

이와 같은 방식으로 하위 컴포넌트에서 상위 컴포넌트로 신호를 올려보내면 상위 컴포넌트의 메서드를 실행할 수도 있고, 하위 컴포넌트로 내려보내는 props의 값을 조정할 수도 있음.



## 같은 레벨의 컴포넌트 간 통신

동일한 상위 컴포넌트를 가진 2개의 하위 컴포넌트 간의 통신은

- Child (하위) -> Parent(상위) -> 다시 2개의 Children (하위)

순으로 이루어진다. **컴포넌트 간의 직접적인 통신은 불가능하도록 되어 있는게 Vue 의 기본 구조**



이런 통신 구조를 유지하다 보면 상위 컴포넌트가 필요 없음에도 불구하고 같은 레벨 간에 통신하기 위해 강제로 상위 컴포넌트를 두어야함. 이를 해결할 수 있는 방법이 이벤트 버스.



## 관계 없는 컴포넌트 간 통신 - 이벤트 버스

이벤트 버스는 개발자가 지정한 2개의 컴포넌트 간에 데이터를 주고받을 수 있는 방법임. 앞에서 배운 컴포넌트 통신은 항상 상위 - 하위 구조를 유지해야만 데이터를 주고받을 수 있었음. 이벤트 버스를 이용하며 이런 상위 - 하위 관계를 유지하고 있지 않아도 데이터를 한 컴포넌트에서 다른 컴포넌트로 전달할 수 있음.

![](https://kr.vuejs.org/images/state.png)

**이벤트 버스 형식**

이벤트 버스를 구현하려면 애플리케이션 로직을 담는 인스턴스와는 별개로 새로운 인스턴스를 1개 더 생성하고, 새 인스턴스를 이용하여 이벤트를 보내고 받음. 보내는 컴포넌트에서는  .$emit()을

받는 컴포넌트 에서는 .$on()을 구현함.



```javascript
//이벤트 버스를 위한 추가 인스턴스 1개 생성
var eventBus = new Vue();

//이벤트를 보내는 컴포넌트
methods:{
    메서드명:function(){
        eventBus.$emit('이벤트명',데이터);
    }
}

//이벤트를 받는 컴포넌트
methods:{
    created:function(){
        eventBus.$on('이벤트명',function(데이터){
            ...
        });
    }
}
```

[exam8)](https://cho-i.github.io/Vue/2week/exam8.html)

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Vue Component</title>
    </head>
    <body>
        <div id="app">
            <child-component></child-component>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
        //1. 먼저 이벤트 버스로 활용할 새 인스턴스를 1개 생성하고 evnetBus라는 변수에 참조. 이제 eventBus 변수로 새 인스턴스의 속성과 메서드에 접근할 수 있음.
        var eventBus = new Vue();

        Vue.component('child-component', {
            //2. 하위 컴포넌트에는 template속성과 methods 속성을 정의. template 속성에는 '하위 컴포넌트 영역입니다.'라는 텍스트와 show 버튼을 추가. methods 속성에는 showLog() 메서드를 정의하고, 메서드 안에는 eventBus.$emit()을 선언하여 triggerEventBus라는 이벤트를 발생하는 로직을 추가. 이 이벤트는 발생할 때 수신하는 쪽에 인자 값으로 100이라는 숫자를 함께 전달.
            template: '<div>하위 컴포넌트 영역입니다.<button v-on:click="showLog">show</button></div>',
            methods: {
                showLog: function() {
                    eventBus.$emit('triggerEventBus', 100);
                }
            }
        });

        var app = new Vue({
            el: '#app',
            created: function() {
                //3. 상위 컴포넌트의 created 라이프 사이클 훅에 eventBus.$on()으로 이벤트를 받는 로직을 선언. 발생한 이벤트 triggerEventBus를 수신할 때 앞에서 전달된 인자 값 100이 콘솔에 출력.
                eventBus.$on('triggerEventBus', function(value){
                    console.log("이벤트를 전달 받음. 전달 받은 값 : ", value);
                });
            }
        });
        </script>
    </body>
</html>
```

show 버튼을 클릭하여 showLog()가 실행되었을 때 eventBus의 이벤트가 발생함. 그리고 발생한 이벤트는 상위 컴포넌트의 created()에 있는 eventBus.$on()에서 전달 받음. 이벤트와 함께 전달된 인자 값 100이 콘솔 로그에 함께 출력.

이벤트 버스를 활용하면 props 속성을 이용하지 않고도 원하는 컴포넌트 간에 직접적으로 데이터를 전달할 수 있어 편리하지만 컴포넌트가 많아지면 어디서 어디로 보냈는지 관리가 되지 않는 문제가 발생. 이 문제를 해결하려면 뷰엑스(Vuex)라는 상태 관리 도구가 필요. 뷰엑스는 추후에...



참고:

https://kr.vuejs.org/v2/guide/components.html

https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/