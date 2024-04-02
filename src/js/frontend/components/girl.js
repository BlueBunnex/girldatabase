import { html } from 'cute-html';

export const sock = (imgUri, imgFileName, imgRes, commentsCount, txt, id, timeStr) => html`
    <article>
        <img id="image" id="img-${id}" src="${imgUri}" alt="user attached image" loading="lazy" onclick="imgToggleBig(this);">
        <div id="meta">
            <span style="max-width: 50%; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${imgFileName}</span>
            <span style="display: inline-block; overflow: hidden;"><span id="imgRes-${id}">(${imgRes})</span> / <i>${timeStr}</i></span>
        </div>
        <div id="body">
            ${txt}
        </div>
        <div id="comments">

            <div class="comment">comment 1</div>
            <div class="comment">comment 2</div>
            <div class="comment">comment 3</div>

            <details>
                <summary>Write comment</summary>
                <form>
                    <textarea id="comment-body" name="comment-body" rows="4"></textarea>
                    <br>
                    <input id="comment-form-submit" type="submit" value="Add comment">
                </form>
            </details>
        </div>
    </article>
`;

