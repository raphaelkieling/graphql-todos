import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

void main() => runApp(MyApp());

class Todo {
  String title;
  bool completed;

  Todo({title, completed}) {
    this.title = title;
    this.completed = completed;
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    super.initState();

    final HttpLink httpLink = HttpLink(
      uri: 'http://localhost:4000/',
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[getTitle(), getListTasks()],
        ),
      ),
    );
  }
}

Widget getTitle() {
  return Text(
    'All tasks',
    style: TextStyle(
        fontSize: 32, fontWeight: FontWeight.bold, color: Colors.black87),
  );
}

Widget getListTasks() {
  List<Todo> todos = [
    new Todo(completed: true, title: 'Upload first shot on Dribbble'),
    new Todo(completed: false, title: 'Read at keast ibe cgaoter of any book')
  ];
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: todos.map((todo) => createTask(todo)).toList(),
  );
}

Widget createTask(Todo todo) {
  return Padding(
    padding: EdgeInsets.only(top: 20),
    child: Row(
      children: <Widget>[
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              todo.title,
              style: TextStyle(
                  fontSize: 16,
                  color: todo.completed ? Colors.black26 : Colors.black87,
                  decoration:
                      todo.completed ? TextDecoration.lineThrough : null),
            ),
            Text('Design stuff', style: TextStyle(color: Colors.black26))
          ],
        )
      ],
    ),
  );
}
