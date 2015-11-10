(function(){
$(function(){
    "use strict";

    var state_class = ['active', 'success', 'warning', 'danger', 'info', 'active', 'white'];

    // ターゲット前のカラー
    function add_class_directory_prev($x, $length ,$objects, $state) {
      for(var i=0; i<$x; i++) {
        $objects[i].classList.add($state[i+1]);
      }
    };
    // ターゲットのカラー
    function add_class_directory($x, $length ,$objects, $state) {
      for (var i = $x; i < $length ; i++) {
        $objects[i].classList.add($state[$x+1]);
      };
    };

    // リストのエレメントを作成
    function create_element($title, $href, $position){
      if($position > 0) {
        var element = document.createElement('ul');
        element.innerHTML = '<li><a href="'+$href+'">'+ $title +'</a></li>';
        return element;
      } else {
        var element = document.createElement('li');
        element.innerHTML = '<a href="'+$href+'">'+ $title +'</a>';
        return element;
      }
    }
    // リストにエレメントを入れる
    function inset_list($element, $family_position){
      var primary_nav = document.getElementById('primaryNav');
      var last_target = primary_nav.lastChild;
      var target_stock = last_target.lastChild;
      var x = 0;

      while(last_target.nodeName != '#text'){
        target_stock = last_target;
        last_target = last_target.lastChild;
        x++;
      }

      if($family_position === 0) {
        if(target_stock == null) { // indexの処理
          primary_nav.appendChild($element);
        } else {
          target_stock.parentNode.parentNode.insertBefore($element, target_stock.nextSibling);
        }
      } else if($family_position > 0) {
        target_stock.parentNode.insertBefore($element, target_stock.nextSibling);
      } else {
        for(var i=1; i<x; i++) {
          target_stock = target_stock.parentNode;
        }
        target_stock.parentNode.insertBefore($element, target_stock.nextSibling);
      }
    };

    // サブリストにエレメントを入れる
    function inset_list_sub($element){
      var primary_nav = document.getElementById('utilityNav');
       primary_nav.appendChild($element);
    }

    var prev_i = 0; // ターゲットの前の要素番号
    var flug = false; // indexを別枠にするためのフラグ
    $('table tbody tr').each(function() {
      var child = $(this).children();
      var child_length = 6; // 0~階層分

      // tbodyのtr以下要素の処理
      for(var i=0; i < child_length; i++) {
        var child_val = child[i].textContent;
        if(child_val != '') {
          // Table add Class
          add_class_directory_prev(i,child_length,child,state_class);
          add_class_directory(i,child_length,child,state_class);

          // list
          var title = child[i].textContent;
          var href = child[6].textContent;
          var this_position = i - prev_i; //　自分の階層ポジション
          if(prev_i===0){
            this_position = 0;
          } else if(flug && i === 0){
            var element = create_element(title, href, this_position);
            inset_list_sub(element, this_position);
            continue;
            return prev_i, flug;
          }
          var element = create_element(title, href, this_position);
          inset_list(element, this_position);
          prev_i = i;
          flug = true;
          continue;
          return prev_i, flug;
        }
      }
    });

    // indexにid="home"を入れる
    $('#primaryNav > li:first-child').attr('id', 'home');
});
}).call(this);