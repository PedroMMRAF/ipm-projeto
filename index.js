window.addEventListener("load", () => {
    [...document.getElementsByTagName("button")]
        .filter((element) => (element.attributes["data-file"] !== undefined))
        .forEach((element) => {
            console.log(element);

            const div = document.createElement("div");
            div.setAttribute("id", element.attributes["data-bs-target"].value.replace("#", ""));
            div.setAttribute("class", "modal fade");
            div.setAttribute("tabindex", "-1");
            div.innerHTML = `
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">PDF</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body m-0 p-0">
                            <object data="${element.attributes["data-file"].value}" type="application/pdf" width="100%" height="100%">
                                <a href="${element.attributes["data-file"].value}">View PDF</a>
                            </object>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(div);
        });
});