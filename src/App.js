import logo from './logo.svg';
import './App.css';
import NestedComponent from './components/NestedComponent';
import SelectableGrid from './components/SelectableGrid';
import CommentsJSON from './components/data/comment.json'

function App() {
  return (
    <div className="App">
       <h1>Nested components</h1>
       <NestedComponent 
        comments={CommentsJSON}
        onSubmit={()=>{ }}
        onEdit={()=>{ }}
        onDownVote={()=>{}}
        onDelete={()=>{}}
        onUpVote={()=>{}}
       />
       <br/>
       <SelectableGrid rows={10} columns={10}/>
    </div>
  );
}

export default App;
