$(document).ready(function() {

    $("#glcm-matrix").on("click", "td", function() {
        var vals = $(this).attr('id').split(",");
        var newArr = vals.map(el => '#' + el).toString();
        if (newArr!=="#0"){
            var str = "#first-matrix ".concat(newArr);
            var back = ["#ff0000","blue","gray"];
            var rand = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
            $(str).addClass('match');
            $(this).css({'background-color':rand,'border-radius':'50%'});
            $(str).css('background-color',rand);
        }
    });

    $("button.cls-theta").click(function(){
        $("#theta button").removeClass('t-active');
        $(this).addClass("t-active");

        var val = $(this).text();
        if (val=='θ=0'){
          degree = 1;
        }
        if (val=='θ=45'){
          degree = 2;
        }
        if (val=='θ=90'){
          degree = 3;
        }
        if (val=='θ=135'){
          degree = 4;
        }
        generate_matrix(degree,distance);
    });

    $("button.cls-distance").click(function(){
        $("#distance button").removeClass('d-active');
        $(this).addClass("d-active");
        var val = $(this).text();
        if (val=='d=1'){
          distance = 1;
        }
        if (val=='d=2'){
          distance = 2;
        }
        if (val=='d=3'){
          distance = 3;
        }
        generate_matrix(degree,distance);
    });

    var degree = 1;
    var distance = 1;
    generate_matrix(degree,distance);

    function generate_matrix(degree,distance){
        var $table = $('<table class="table table-border">');
        var row = 6;
        var col = 6;
        var min = 0;
        var max = 8;
        var theta = degree;
        var dist = distance;
        var matx = new Array(row);
        var glcm_matx = new Array(max).fill(0).map(() => new Array(max).fill(0).map(()=>new Array(2).fill(0)));

        for (i = 0; i < row; i++) {
            matx[i] = Array(col);
            $td = $table.append('<tr />').children('tr:last');
            for (j = 0; j < col; j++) {
                var rand_val = Math.floor(Math.random() * max) + 1;
                matx[i][j] = rand_val;
                var td_class = "<td id='".concat(i,j,"'>");
                var td_val = td_class.concat(rand_val, "</td>");
                $td.append(td_val);
            }

            for (k = 0; k < col; k++) {
                m = matx[i][k];
                n = 0;
                var ri,ci;
                if (theta==1 && (k + dist < col)){
                    ri = i;
                    ci = k + dist;
                    n = matx[ri][ci];
                } else if(theta==2 && (k + dist < col) && (i - dist  >= 0)){
                    ri = i - dist;
                    ci = k + dist;
                    n = matx[ri][ci];

                } else if (theta==3 && (i - dist  >= 0)){
                    ri = i - dist;
                    ci = k;
                    n = matx[ri][ci];
                } else if (theta==4 && (k - dist >= 0) && (i - dist  >= 0)){
                    ri = i - dist;
                    ci = k - dist;
                    n = matx[ri][ci];
                }

                if ( n > 0){
                    glcm_matx[m - 1][n - 1][0] = glcm_matx[m - 1][n - 1][0] + 1;
                    if (glcm_matx[m - 1][n - 1][1] ==0){
                        glcm_matx[m - 1][n - 1][1] ='';
                    }else{
                        glcm_matx[m - 1][n - 1][1] =glcm_matx[m - 1][n - 1][1].concat(',');
                    }
                    glcm_matx[m - 1][n - 1][1] = glcm_matx[m - 1][n - 1][1].concat(i,k,',',ri,ci);
                }
            }
        }
        $table.append('</table>');
        var $glcc_table = $('<table class="table table-border">');

        for (gli = 0; gli < max; gli++) {
            $gl_td = $glcc_table.append('<tr />').children('tr:last');
            for (glj = 0; glj < max; glj++) {
                var $gl_td_class = "<td id='".concat(glcm_matx[gli][glj][1],"'>");
                var $gl_td_val = $gl_td_class.concat(glcm_matx[gli][glj][0], "</td>");
                $gl_td.append($gl_td_val);
            }
        }
        $('#first-matrix').empty();
        $table.appendTo('#first-matrix');
        $('#glcm-matrix').empty();
        $glcc_table.appendTo('#glcm-matrix');
    }
});