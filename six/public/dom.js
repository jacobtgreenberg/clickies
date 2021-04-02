$(()=>{

    const $button = $('<div>').html('<button type="button">send</button>')

    const form= `<form action="/" method="POST">
                    
                    <textarea class="body"  name="text"></textarea><br>
                    <textarea name="tags" placeholder="tags"></textarea><br><br>
                    <input type="submit" value="submit">
                    <input type="submit" value="send" formaction="/send">
                    <input type="submit" value="cancel" formaction="/cancel">
                    <select name="color">
                    <option value=""></option>
                    <option value="r">r</option>
                    <option value="y">y</option>
                    <option value="g">g</option>
                    <option value="p">p</option>
                    <option value="b">b</option>
                </select>
                </form>
                `
    
    
    $('#trigger').one('click',(e)=> {
    $(e.target).addClass('form-format')
    $(e.target).html(form)
    })
    

    

    $('.clicked').one('click', (e) => {
        $(e.target).addClass('form-format')
        const formd = `<form action="/${$(e.currentTarget).attr('id')}?_method=PUT" method="POST">
                            <textarea class="body" name="text">${$(`#${$(e.currentTarget).attr('id')}text`).text().trim()}</textarea>
                            <br>
                            <textarea name="tags" placeholder="tags">${$(`#${$(e.currentTarget).attr('id')}tags`).text().trim()}</textarea><br><br>
                            <input type="submit" value="submit">
                            <input type="submit" value="send" formaction="/send/upsend/${$(e.currentTarget).attr('id')}">
                            <input type="submit" value="delete" formaction="/${$(e.currentTarget).attr('id')}?_method=DELETE">
                            <select name="color">
                                <option value=""></option>
                                <option value="r">r</option>
                                <option value="y">y</option>
                                <option value="g">g</option>
                                <option value="p">p</option>
                                <option value="b">b</option>
                            </select>
                        </form>`
        $(e.currentTarget).html(formd)
    })

    $('.inboxclick').one('click', (e) => {
        console.log($(e.target).attr('class').length)
        let letter = $(e.target).attr('class')[$(e.target).attr('class').length - 1]
        console.log(letter)
        $(e.target).addClass('form-format')
        const formd = `<form action="/upload/${$(e.currentTarget).attr('id')}?_method=PUT" method="POST">
                        <textarea class="body" name="text" readonly>${$(`#${$(e.currentTarget).attr('id')}text`).text().trim()}</textarea>
                        <br>
                        <textarea name="tags" placeholder="tags" readonly>${$(`#${$(e.currentTarget).attr('id')}tags`).text().trim()}</textarea><br><br>
                        <input type="submit" value="upload">
                        <input type="submit" value="reply" formaction="/send/reply/${$(e.currentTarget).attr('id')}">
                        <input type="submit" value="delete" formaction="/${$(e.currentTarget).attr('id')}?_method=DELETE">
                        <input type="submit" value="cancel" formaction="/cancelinbox">
                        <input type="hidden" name="color" value="${letter}"/>
                        </form>`
        $(e.currentTarget).html(formd)
    })



})