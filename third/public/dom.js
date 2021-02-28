
$(()=>{

    const form= `<form action="/" method="POST">
                    
                    <textarea class="body"  name="text"></textarea><br>
                    <textarea name="tags" placeholder="tags"></textarea><br>
                    <input type="submit" value="submit">
                    <input type="submit" value="cancel" formaction="/cancel">
                </form>
                <form>
                
                </form>
                `
    
    $('#trigger').one('click',(e)=> {
    $(e.target).html(form)
    })
    

    

    $('.clicked').one('click', (e) => {
        const formd = `<form action="/${$(e.target).attr('id')}?_method=PUT" method="POST">
                        <textarea class="body" name="text">${$(`#${$(e.target).attr('id')}text`).text().trim()}</textarea>
                        <br>
                        <textarea name="tags" placeholder="tags">${$(`#${$(e.target).attr('id')}tags`).text().trim()}</textarea><br>
                        <input type="submit" value="submit">
                        <input type="submit" value="delete" formaction="/${$(e.target).attr('id')}?_method=DELETE">
                        </form>`
        $(e.currentTarget).html(formd)
    })

})



// <% for(let j = 0;j < complete[i].tags.length ; j++){%>
//     <%if(j < complete[i].tags.length -1){%>
//    <%= complete[i].tags[j] + ", " %> 
//    <%}else{%>
//     <%= complete[i].tags[j]%>
//     <%}%>
//    <% } %>

//<p id="<%=complete[i].id%>tags"><%= complete[i].tags %></p>

//   <p><%for(let j = 0;j < complete[i].tags.length ; j++){%><%if(j < complete[i].tags.length -1){%><%= complete[i].tags[j] + ", " %><%}else{%><%= complete[i].tags[j]%><%}%><%}%></p>