$(()=>{

    const $button = $('<div>').html('<button type="button">send</button>')

    const form= `<form action="/" method="POST">
                    
                    <textarea class="body"  name="text"></textarea><br>
                    <textarea name="tags" placeholder="tags"></textarea><br>
                    <input type="submit" value="submit">
                    <input type="submit" value="send" formaction="/send">
                    <input type="submit" value="cancel" formaction="/cancel">
                </form>
                <form>
                
                </form>
                `
    
    
    $('#trigger').one('click',(e)=> {
    $(e.target).html(form)
    })
    

    

    $('.clicked').one('click', (e) => {
        const formd = `<form action="/${$(e.currentTarget).attr('id')}?_method=PUT" method="POST">
                        <textarea class="body" name="text">${$(`#${$(e.currentTarget).attr('id')}text`).text().trim()}</textarea>
                        <br>
                        <textarea name="tags" placeholder="tags">${$(`#${$(e.currentTarget).attr('id')}tags`).text().trim()}</textarea><br>
                        <input type="submit" value="submit">
                        <input type="submit" value="send" formaction="/send/upsend/${$(e.currentTarget).attr('id')}">
                        <input type="submit" value="delete" formaction="/${$(e.currentTarget).attr('id')}?_method=DELETE">
                        </form>`
        $(e.currentTarget).html(formd)
    })

})