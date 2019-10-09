class Imd {
  static MarkDownToHTML(text) {
    // The other which things are written in is very important.
    // It's order to prevent errors or overlaps.

    // Bold Text
    // **text**
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic Text
    // *text*
    text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");

    // Strike Through
    // ~~text~~
    text = text.replace(/\~\~(.*?)\~\~/g, "<imd style='text-decoration: line-through;'>$1</imd>");

    // Coloured Text.
    // [color=#HEXCOLOR]text[/color]
    // [color:#HEXCOLOR]text[/color]
    text = text.replace(/\[color=(.*?)\](.*?)\[\/color\]|\[color:(.*?)\](.*?)\[\/color\]/g, "<imd style='color:$1'>$2</imd>");
    return text;
  }
}
