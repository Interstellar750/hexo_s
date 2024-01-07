/** copy code block to clipboard
 * @todo better transition animate
 * @todo remove dummy code
 * @todo typecheck
 */
export const copyCode = () => {
    const codeBlocks = document.querySelectorAll('pre')
    const copyText = 'Copy all'
    const copiedText = 'All copied'

    //copy funciton
    const copy = async (el: HTMLElement, btn: HTMLElement) => {
        //select code
        const range = document.createRange()
        const end = el.childNodes.length
        range.setStart(el, 2)
        range.setEnd(el, end)
        const selection = window.getSelection()
        if (!selection) return
        selection.removeAllRanges()
        selection.addRange(range)

        // copy to clipboard
        document.execCommand('copy', false)
        const clip = async () => navigator.clipboard.writeText(selection.toString())

        if (!clip) return
        btn.textContent = copiedText
        setTimeout(() => {
            btn.textContent = copyText
        }, 3000)
        selection.removeRange(range)
    }

    codeBlocks.forEach((block: HTMLElement) => {
        // add copy button
        const copyBtn: HTMLElement = document.createElement('button')
        copyBtn.textContent = copyText
        copyBtn.classList.add('btn', 'btn-neutral', 'btn-xs', 'absolute', 'right-3', 'top-3', 'opacity-40', 'no-animation')
        block.prepend(copyBtn)

        block.addEventListener('mouseenter', () => {
            copyBtn.classList.remove('opacity-40')
        })

        block.addEventListener('mouseleave', () => {
            copyBtn.classList.add('opacity-40')
        })

        copyBtn.addEventListener('click', e => {
            e.preventDefault()
            copy(block, copyBtn)
        })
    })
}