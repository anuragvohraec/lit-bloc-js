# Bloc
Business Logic Components: This pattern aims to extract away all business logics into components, which will manage UI states and will notify the UI to re-render themselves when this states changes.

# Important classes
Bloc : All classes which needs to implement some business logic [be it for interacting with front end or backend systems], needs to be implemented in subclass of this class.
```ts
export class CounterBloc extends Bloc<number>{

  constructor(){
      super(0);
  }

  increment(){
      let n = this.state;
      n++;
      this.emit(n);
  }

  decrement(){
      let n = this.state;
      n--;
      this.emit(n);
  }
}
```
In above example **number** is state [state can be any js object] of this Bloc , which it tries to modify/manage.

BlocsProvider: This class will provide your blocs to rest all components in your DOM tree.
```ts
export class CounterBlocProvider extends BlocsProvider{
  constructor(){
      super([new CounterBloc()]);
  }

  builder(){
      return html`<div><slot></slot></div>`;
  }
}
```

BlocBuilder: This class listens for a state changes for a particular type and redraw its components based on it. A BlocBuilder can be provided a bloc directly too.
```ts

export class CounterBlocBuilder extends BlocBuilder<CounterBloc, number>{
  constructor(){
      super(CounterBloc);
  }

  increment=()=>{
    this.bloc?.increment();
  }

  decrement=()=>{
    this.bloc?.decrement();
  }

  builder(state: number){
      return html`
      <div>Current state is : ${state}</div>
      <div><button @click=${this.increment}>increment</button></div>
      <div><button @click=${this.decrement}>decrement</button></div>
      `;
  }
}
```
Important points about bloc builder designing:
* In above example we have defined increment and decrement function with arrow function format, to preserve meaning of this. Else when @click event vinding binds a event listner the **this** will mean the button element rather than instance of blocbuilder.
* Blocs can be provided a bloc directly too, rather than making it depended on BlocsProvider. 
```ts
// the call to super will be 
super(CounterBloc, new CounterBloc());
```

Usage in HTML code:
```html
<counter-bloc-provider>
    <div>
        <h1>Blocs demo</h1>
        <counter-bloc-builder></counter-bloc-builder>
    </div>
</counter-bloc-provider>
```


ReposProvider: This can used to hold up any other class that needs to be provided down the dom tree.
```ts
class MyMaths extends ReposProvider{
    constructor(){
        super([new Arithmatics(), new Integerals(), new Probability()])
    }
}

//and later the class can be retrieved an where in the dom tree.
ReposProvider.of(Arithmatic, this);
```