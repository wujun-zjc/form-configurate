/**
 *  校验功能
 * 
 * 
 */

// 保存属性设置校验
function saveValidate(type) {
    // 取设置的属性
    if (type == "area") {
        var text = rightArea.find("input.text").val();
        return 
    }
    if (type == "input") {
        var text = rightInput.find("input.text").val();
        var id = rightInput.find("input.id").val();
        var name = rightInput.find("input.name").val();
        var placeholder = rightInput.find("input.placeholder").val();
        var url = rightInput.find("select.url").val();
        var readOnly = rightInput.find("input[name=readOnly]:checked").val();

        return text;
    }
}