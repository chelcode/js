var EventCalendar = {};
 
function overlap(e1, e2)
{
   return e2.start < e1.end && e2.end > e1.start;
}
function expand(e, iCol, columns)
{
   var len = columns.length;
   var cols = 0;
   for (var i = iCol+1; i < len; i++) {
        var col = columns[ i ];
        for (var j = 0; j < col.length; j++)
        {
          if (overlap( col[j], e ) )
             return cols;
        }
        cols++;
   }
   return cols;
}
 
window.EventCalendar.layOutDay = function (events) {
  
    var ptop, pbom, node, nodebom, len, w;
    var container = document.getElementById("events");
    var columns = new Array();
     
    events = events.sort(function(e1,e2) {
      if (e1.start < e2.start) return -1;
      if (e1.start > e2.start) return 1;
      if (e1.end < e2.end) return -1;
      if (e1.end > e2.end) return 1;
      return 0;
    });
     
    for (i=0;i<events.length;i++)
    {
       var e = events[i];
       var inserted = false;
       
       for (var j = 0; j < columns.length; j++) {                   
          var col = columns[j];
          if (!overlap( col[col.length-1], e ) ) {
              col.push(e);
               
              inserted = true;
              break;
          }
       }
       if (!inserted) {
          var newCol = new Array();
          newCol.push(e);
          
          columns.push(newCol);
       } 
    }
    len = columns.length;
    w = 600/len;
     
    for (var i = 0; i < len; i++) {
        var col = columns[ i ];
         
        for (var j = 0; j < col.length; j++) {
            var e = col[j];
            var cols = expand(e, i, columns);
         
            var ele=document.createElement("div");
           
            ele.className = 'event';
            ele.style.height = e.end - e.start +"px";
            ele.style.top = e.start +"px";
            ele.style.left = i*w + "px";
            ele.style.width = (1+cols)*w - 4 +"px";
             
            ptop = document.createElement("p");
            pbom = document.createElement("p");
            node = document.createTextNode("Sample item");
            nodebom = document.createTextNode("Sample Location");
         
            ptop.className = "node";
            pbom.className = "nodebom";
         
            ptop.appendChild(node);
            pbom.appendChild(nodebom);
            ele.appendChild(ptop);
            ele.appendChild(pbom);
     
            container.appendChild(ele);
        }
    }
}
//window.EventCalendar.layOutDay([ {start: 30, end: 150}, {start: 50, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]);
