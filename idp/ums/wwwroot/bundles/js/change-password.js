!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(h){h.extend(h.fn,{validate:function(t){var i;{if(this.length)return(i=h.data(this[0],"validator"))||(this.attr("novalidate","novalidate"),i=new h.validator(t,this[0]),h.data(this[0],"validator",i),i.settings.onsubmit&&(this.on("click.validate",":submit",function(t){i.submitButton=t.currentTarget,h(this).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==h(this).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.on("submit.validate",function(s){function t(){var t,e;return i.submitButton&&(i.settings.submitHandler||i.formSubmitted)&&(t=h("<input type='hidden'/>").attr("name",i.submitButton.name).val(h(i.submitButton).val()).appendTo(i.currentForm)),!(i.settings.submitHandler&&!i.settings.debug)||(e=i.settings.submitHandler.call(i,i.currentForm,s),t&&t.remove(),void 0!==e&&e)}return i.settings.debug&&s.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,t()):i.form()?i.pendingRequest?!(i.formSubmitted=!0):t():(i.focusInvalid(),!1)})),i);t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")}},valid:function(){var t,e,s;return h(this[0]).is("form")?t=this.validate().form():(s=[],t=!0,e=h(this[0].form).validate(),this.each(function(){(t=e.element(this)&&t)||(s=s.concat(e.errorList))}),e.errorList=s),t},rules:function(t,e){var s,i,a,r,n,o=this[0],l=void 0!==this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=o&&(!o.form&&l&&(o.form=this.closest("form")[0],o.name=this.attr("name")),null!=o.form)){if(t)switch(s=h.data(o.form,"validator").settings,i=s.rules,a=h.validator.staticRules(o),t){case"add":h.extend(a,h.validator.normalizeRule(e)),delete a.messages,i[o.name]=a,e.messages&&(s.messages[o.name]=h.extend(s.messages[o.name],e.messages));break;case"remove":return e?(n={},h.each(e.split(/\s/),function(t,e){n[e]=a[e],delete a[e]}),n):(delete i[o.name],a)}return(l=h.validator.normalizeRules(h.extend({},h.validator.classRules(o),h.validator.attributeRules(o),h.validator.dataRules(o),h.validator.staticRules(o)),o)).required&&(r=l.required,delete l.required,l=h.extend({required:r},l)),l.remote&&(r=l.remote,delete l.remote,l=h.extend(l,{remote:r})),l}}});function e(t){return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}var s;h.extend(h.expr.pseudos||h.expr[":"],{blank:function(t){return!e(""+h(t).val())},filled:function(t){t=h(t).val();return null!==t&&!!e(""+t)},unchecked:function(t){return!h(t).prop("checked")}}),h.validator=function(t,e){this.settings=h.extend(!0,{},h.validator.defaults,t),this.currentForm=e,this.init()},h.validator.format=function(s,t){return 1===arguments.length?function(){var t=h.makeArray(arguments);return t.unshift(s),h.validator.format.apply(this,t)}:(void 0===t||((t=2<arguments.length&&t.constructor!==Array?h.makeArray(arguments).slice(1):t).constructor!==Array&&(t=[t]),h.each(t,function(t,e){s=s.replace(new RegExp("\\{"+t+"\\}","g"),function(){return e})})),s)},h.extend(h.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:h([]),errorLabelContainer:h([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(t)))},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){9===e.which&&""===this.elementValue(t)||-1!==h.inArray(e.keyCode,[16,17,18,20,35,36,37,38,39,40,45,144,225])||(t.name in this.submitted||t.name in this.invalid)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(t,e,s){("radio"===t.type?this.findByName(t.name):h(t)).addClass(e).removeClass(s)},unhighlight:function(t,e,s){("radio"===t.type?this.findByName(t.name):h(t)).removeClass(e).addClass(s)}},setDefaults:function(t){h.extend(h.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:h.validator.format("Please enter no more than {0} characters."),minlength:h.validator.format("Please enter at least {0} characters."),rangelength:h.validator.format("Please enter a value between {0} and {1} characters long."),range:h.validator.format("Please enter a value between {0} and {1}."),max:h.validator.format("Please enter a value less than or equal to {0}."),min:h.validator.format("Please enter a value greater than or equal to {0}."),step:h.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function t(t){var e,s,i=void 0!==h(this).attr("contenteditable")&&"false"!==h(this).attr("contenteditable");!this.form&&i&&(this.form=h(this).closest("form")[0],this.name=h(this).attr("name")),a===this.form&&(i=h.data(this.form,"validator"),e="on"+t.type.replace(/^validate/,""),(s=i.settings)[e]&&!h(this).is(s.ignore)&&s[e].call(i,this,t))}this.labelContainer=h(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||h(this.currentForm),this.containers=h(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var s,a=this.currentForm,i=this.groups={};h.each(this.settings.groups,function(s,t){"string"==typeof t&&(t=t.split(/\s/)),h.each(t,function(t,e){i[e]=s})}),s=this.settings.rules,h.each(s,function(t,e){s[t]=h.validator.normalizeRule(e)}),h(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",t).on("click.validate","select, option, [type='radio'], [type='checkbox']",t),this.settings.invalidHandler&&h(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),h.extend(this.submitted,this.errorMap),this.invalid=h.extend({},this.errorMap),this.valid()||h(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(t){var e,s,i=this.clean(t),a=this.validationTargetFor(i),r=this,n=!0;return void 0===a?delete this.invalid[i.name]:(this.prepareElement(a),this.currentElements=h(a),(s=this.groups[a.name])&&h.each(this.groups,function(t,e){e===s&&t!==a.name&&((i=r.validationTargetFor(r.clean(r.findByName(t))))&&i.name in r.invalid&&(r.currentElements.push(i),n=r.check(i)&&n))}),e=!1!==this.check(a),n=n&&e,this.invalid[a.name]=!e,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),h(t).attr("aria-invalid",!e)),n},showErrors:function(e){var s;e&&(h.extend((s=this).errorMap,e),this.errorList=h.map(this.errorMap,function(t,e){return{message:t,element:s.findByName(e)[0]}}),this.successList=h.grep(this.successList,function(t){return!(t.name in e)})),this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){h.fn.resetForm&&h(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var t=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(t)},resetElements:function(t){var e;if(this.settings.unhighlight)for(e=0;t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,""),this.findByName(t[e].name).removeClass(this.settings.validClass);else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e,s=0;for(e in t)void 0!==t[e]&&null!==t[e]&&!1!==t[e]&&s++;return s},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(t){t.not(this.containers).text(""),this.addWrapper(t).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{h(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch(t){}},findLastActive:function(){var e=this.lastActive;return e&&1===h.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var s=this,i={};return h(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var t=this.name||h(this).attr("name"),e=void 0!==h(this).attr("contenteditable")&&"false"!==h(this).attr("contenteditable");return!t&&s.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=h(this).closest("form")[0],this.name=t),!(this.form!==s.currentForm||t in i||!s.objectLength(h(this).rules())||(i[t]=!0,0))})},clean:function(t){return h(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return h(this.settings.errorElement+"."+t,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=h([]),this.toHide=h([])},reset:function(){this.resetInternals(),this.currentElements=h([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(t){var e=h(t),s=t.type,i=void 0!==e.attr("contenteditable")&&"false"!==e.attr("contenteditable");return"radio"===s||"checkbox"===s?this.findByName(t.name).filter(":checked").val():"number"===s&&void 0!==t.validity?t.validity.badInput?"NaN":e.val():(t=i?e.text():e.val(),"file"===s?"C:\\fakepath\\"===t.substr(0,12)?t.substr(12):0<=(i=t.lastIndexOf("/"))?t.substr(i+1):0<=(i=t.lastIndexOf("\\"))?t.substr(i+1):t:"string"==typeof t?t.replace(/\r/g,""):t)},check:function(e){e=this.validationTargetFor(this.clean(e));var t,s,i,a,r=h(e).rules(),n=h.map(r,function(t,e){return e}).length,o=!1,l=this.elementValue(e);for(s in"function"==typeof r.normalizer?a=r.normalizer:"function"==typeof this.settings.normalizer&&(a=this.settings.normalizer),a&&(l=a.call(e,l),delete r.normalizer),r){i={method:s,parameters:r[s]};try{if("dependency-mismatch"===(t=h.validator.methods[s].call(this,l,e,i.parameters))&&1===n){o=!0;continue}if(o=!1,"pending"===t)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(!t)return this.formatAndAdd(e,i),!1}catch(t){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+i.method+"' method.",t),t instanceof TypeError&&(t.message+=".  Exception occurred when checking element "+e.id+", check the '"+i.method+"' method."),t}}if(!o)return this.objectLength(r)&&this.successList.push(e),!0},customDataMessage:function(t,e){return h(t).data("msg"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase())||h(t).data("msg")},customMessage:function(t,e){t=this.settings.messages[t];return t&&(t.constructor===String?t:t[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(t,e){var s=this.findDefined(this.customMessage(t.name,(e="string"==typeof e?{method:e}:e).method),this.customDataMessage(t,e.method),!this.settings.ignoreTitle&&t.title||void 0,h.validator.messages[e.method],"<strong>Warning: No message defined for "+t.name+"</strong>"),i=/\$?\{(\d+)\}/g;return"function"==typeof s?s=s.call(this,e.parameters,t):i.test(s)&&(s=h.validator.format(s.replace(i,"{$1}"),e.parameters)),s},formatAndAdd:function(t,e){var s=this.defaultMessage(t,e);this.errorList.push({message:s,element:t,method:e.method}),this.errorMap[t.name]=s,this.submitted[t.name]=s},addWrapper:function(t){return t=this.settings.wrapper?t.add(t.parent(this.settings.wrapper)):t},defaultShowErrors:function(){for(var t,e,s=0;this.errorList[s];s++)e=this.errorList[s],this.settings.highlight&&this.settings.highlight.call(this,e.element,this.settings.errorClass,this.settings.validClass),this.showLabel(e.element,e.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(s=0;this.successList[s];s++)this.showLabel(this.successList[s]);if(this.settings.unhighlight)for(s=0,t=this.validElements();t[s];s++)this.settings.unhighlight.call(this,t[s],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return h(this.errorList).map(function(){return this.element})},showLabel:function(t,e){var s,i,a,r=this.errorsFor(t),n=this.idOrName(t),o=h(t).attr("aria-describedby");r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),r.html(e)):(i=r=h("<"+this.settings.errorElement+">").attr("id",n+"-error").addClass(this.settings.errorClass).html(e||""),this.settings.wrapper&&(i=r.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(i):this.settings.errorPlacement?this.settings.errorPlacement.call(this,i,h(t)):i.insertAfter(t),r.is("label")?r.attr("for",n):0===r.parents("label[for='"+this.escapeCssMeta(n)+"']").length&&(i=r.attr("id"),o?o.match(new RegExp("\\b"+this.escapeCssMeta(i)+"\\b"))||(o+=" "+i):o=i,h(t).attr("aria-describedby",o),(s=this.groups[t.name])&&h.each((a=this).groups,function(t,e){e===s&&h("[name='"+a.escapeCssMeta(t)+"']",a.currentForm).attr("aria-describedby",r.attr("id"))}))),!e&&this.settings.success&&(r.text(""),"string"==typeof this.settings.success?r.addClass(this.settings.success):this.settings.success(r,t)),this.toShow=this.toShow.add(r)},errorsFor:function(t){var e=this.escapeCssMeta(this.idOrName(t)),t=h(t).attr("aria-describedby"),e="label[for='"+e+"'], label[for='"+e+"'] *";return t&&(e=e+", #"+this.escapeCssMeta(t).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(t){return t.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(t){return this.groups[t.name]||!this.checkable(t)&&t.id||t.name},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name)),h(t).not(this.settings.ignore)[0]},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(t){return h(this.currentForm).find("[name='"+this.escapeCssMeta(t)+"']")},getLength:function(t,e){switch(e.nodeName.toLowerCase()){case"select":return h("option:selected",e).length;case"input":if(this.checkable(e))return this.findByName(e.name).filter(":checked").length}return t.length},depend:function(t,e){return!this.dependTypes[typeof t]||this.dependTypes[typeof t](t,e)},dependTypes:{boolean:function(t){return t},string:function(t,e){return!!h(t,e.form).length},function:function(t,e){return t(e)}},optional:function(t){var e=this.elementValue(t);return!h.validator.methods.required.call(this,e,t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,h(t).addClass(this.settings.pendingClass),this.pending[t.name]=!0)},stopRequest:function(t,e){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],h(t).removeClass(this.settings.pendingClass),e&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(h(this.currentForm).submit(),this.submitButton&&h("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!e&&0===this.pendingRequest&&this.formSubmitted&&(h(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t,e){return e="string"==typeof e&&e||"remote",h.data(t,"previousValue")||h.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,{method:e})})},destroy:function(){this.resetForm(),h(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,e){t.constructor===String?this.classRuleSettings[t]=e:h.extend(this.classRuleSettings,t)},classRules:function(t){var e={},t=h(t).attr("class");return t&&h.each(t.split(" "),function(){this in h.validator.classRuleSettings&&h.extend(e,h.validator.classRuleSettings[this])}),e},normalizeAttributeRule:function(t,e,s,i){/min|max|step/.test(s)&&(null===e||/number|range|text/.test(e))&&(i=Number(i),isNaN(i)&&(i=void 0)),i||0===i?t[s]=i:e===s&&"range"!==e&&(t[s]=!0)},attributeRules:function(t){var e,s,i={},a=h(t),r=t.getAttribute("type");for(e in h.validator.methods)s="required"===e?(s=t.getAttribute(e),""===s&&(s=!0),!!s):a.attr(e),this.normalizeAttributeRule(i,r,e,s);return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(t){var e,s,i={},a=h(t),r=t.getAttribute("type");for(e in h.validator.methods)s=a.data("rule"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase()),""===s&&(s=!0),this.normalizeAttributeRule(i,r,e,s);return i},staticRules:function(t){var e={},s=h.data(t.form,"validator");return e=s.settings.rules?h.validator.normalizeRule(s.settings.rules[t.name])||{}:e},normalizeRules:function(i,a){return h.each(i,function(t,e){if(!1===e)delete i[t];else if(e.param||e.depends){var s=!0;switch(typeof e.depends){case"string":s=!!h(e.depends,a.form).length;break;case"function":s=e.depends.call(a,a)}s?i[t]=void 0===e.param||e.param:(h.data(a.form,"validator").resetElements(h(a)),delete i[t])}}),h.each(i,function(t,e){i[t]="function"==typeof e&&"normalizer"!==t?e(a):e}),h.each(["minlength","maxlength"],function(){i[this]&&(i[this]=Number(i[this]))}),h.each(["rangelength","range"],function(){var t;i[this]&&(Array.isArray(i[this])?i[this]=[Number(i[this][0]),Number(i[this][1])]:"string"==typeof i[this]&&(t=i[this].replace(/[\[\]]/g,"").split(/[\s,]+/),i[this]=[Number(t[0]),Number(t[1])]))}),h.validator.autoCreateRanges&&(null!=i.min&&null!=i.max&&(i.range=[i.min,i.max],delete i.min,delete i.max),null!=i.minlength&&null!=i.maxlength&&(i.rangelength=[i.minlength,i.maxlength],delete i.minlength,delete i.maxlength)),i},normalizeRule:function(t){var e;return"string"==typeof t&&(e={},h.each(t.split(/\s/),function(){e[this]=!0}),t=e),t},addMethod:function(t,e,s){h.validator.methods[t]=e,h.validator.messages[t]=void 0!==s?s:h.validator.messages[t],e.length<3&&h.validator.addClassRules(t,h.validator.normalizeRule(t))},methods:{required:function(t,e,s){return this.depend(s,e)?"select"===e.nodeName.toLowerCase()?(s=h(e).val())&&0<s.length:this.checkable(e)?0<this.getLength(t,e):null!=t&&0<t.length:"dependency-mismatch"},email:function(t,e){return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},url:function(t,e){return this.optional(e)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(t)},date:(s=!1,function(t,e){return s||(s=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString())}),dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)},number:function(t,e){return this.optional(e)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},minlength:function(t,e,s){t=Array.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||s<=t},maxlength:function(t,e,s){t=Array.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||t<=s},rangelength:function(t,e,s){t=Array.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||t>=s[0]&&t<=s[1]},min:function(t,e,s){return this.optional(e)||s<=t},max:function(t,e,s){return this.optional(e)||t<=s},range:function(t,e,s){return this.optional(e)||t>=s[0]&&t<=s[1]},step:function(t,e,s){function i(t){return(t=(""+t).match(/(?:\.(\d+))?$/))&&t[1]?t[1].length:0}function a(t){return Math.round(t*Math.pow(10,r))}var r,n=h(e).attr("type"),o="Step attribute on input type "+n+" is not supported.",l=new RegExp("\\b"+n+"\\b"),d=!0;if(n&&!l.test(["text","number","range"].join()))throw new Error(o);return r=i(s),(i(t)>r||a(t)%a(s)!=0)&&(d=!1),this.optional(e)||d},equalTo:function(t,e,s){s=h(s);return this.settings.onfocusout&&s.not(".validate-equalTo-blur").length&&s.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){h(e).valid()}),t===s.val()},remote:function(i,a,t,r){if(this.optional(a))return"dependency-mismatch";r="string"==typeof r&&r||"remote";var n,e,o=this.previousValue(a,r);return this.settings.messages[a.name]||(this.settings.messages[a.name]={}),o.originalMessage=o.originalMessage||this.settings.messages[a.name][r],this.settings.messages[a.name][r]=o.message,e=h.param(h.extend({data:i},(t="string"==typeof t?{url:t}:t).data)),o.old===e?o.valid:(o.old=e,(n=this).startRequest(a),(e={})[a.name]=i,h.ajax(h.extend(!0,{mode:"abort",port:"validate"+a.name,dataType:"json",data:e,context:n.currentForm,success:function(t){var e,s=!0===t||"true"===t;n.settings.messages[a.name][r]=o.originalMessage,s?(e=n.formSubmitted,n.resetInternals(),n.toHide=n.errorsFor(a),n.formSubmitted=e,n.successList.push(a),n.invalid[a.name]=!1,n.showErrors()):(e={},t=t||n.defaultMessage(a,{method:r,parameters:i}),e[a.name]=o.message=t,n.invalid[a.name]=!0,n.showErrors(e)),o.valid=s,n.stopRequest(a,s)}},t)),"pending")}}});var i,a={};return h.ajaxPrefilter?h.ajaxPrefilter(function(t,e,s){var i=t.port;"abort"===t.mode&&(a[i]&&a[i].abort(),a[i]=s)}):(i=h.ajax,h.ajax=function(t){var e=("mode"in t?t:h.ajaxSettings).mode,s=("port"in t?t:h.ajaxSettings).port;return"abort"===e?(a[s]&&a[s].abort(),a[s]=i.apply(this,arguments),a[s]):i.apply(this,arguments)}),h});var validateUserpassword={p_policy_uppercase:function(t){this.name="p_policy_uppercase";if(/^(?=.*[A-Z]).+$/.test(t))return"p_policy_uppercase"},p_policy_lowercase:function(t){this.name="p_policy_lowercase";if(/^(?=.*[a-z]).+$/.test(t))return"p_policy_lowercase"},p_policy_number:function(t){this.name="p_policy_number";if(/^(?=.*\d).+$/.test(t))return"p_policy_number"},p_policy_specialcharacter:function(t){this.name="p_policy_specialcharacter";if(/^(?=.*(_|[^\w])).+$/.test(t))return"p_policy_specialcharacter"},p_policy_length:function(t){if(this.name="p_policy_length",t.length>=$('meta[name="password_policy:minlength"]').attr("content"))return"p_policy_length"}};function passwordBoxHightlight(t){var e="",s=($(t).closest("div").addClass("e-error"),"popover"===$("#new-password").data("toggle")),i=s?$("#password_policy_rules").find("li>span:not(.content)"):$("#password_policy_rules").find("li>span"),a=s?"su-password-tick":"su-tick";if("new-password"==$(t).attr("id")){for(var r=0;r<i.length;r++)$(i[r]).attr("class")==a?$(t).closest("div").removeClass("e-error"):e="[[[unsatisfied-rule]]]";""!=e&&null!=e&&$(t).closest("div").addClass("e-error")}}function passwordBoxUnhightlight(t){var e="",s=($(t).closest("div").removeClass("e-error"),"popover"===$("#new-password").data("toggle")),i=s?$("#password_policy_rules").find("li>span:not(.content)"):$("#password_policy_rules").find("li>span"),a=s?"su-password-tick":"su-tick";if("new-password"==$(t).attr("id")){for(var r=0;r<i.length;r++)$(i[r]).attr("class")!=a&&(e="[[[unsatisfied-rule]]]"),$(i[r]).attr("class")==a&&$(t).closest("div").removeClass("e-error");""!=e&&null!=e&&($(t).closest("div").addClass("e-error"),e="")}$(t).closest("div").find(".password-validate-holder").html("")}function passwordPolicyPopover(t,e){var s=$(t),i=(s.popover("show"),new Array);i.push(validateUserpassword.p_policy_uppercase),i.push(validateUserpassword.p_policy_lowercase),i.push(validateUserpassword.p_policy_number),i.push(validateUserpassword.p_policy_specialcharacter),i.push(validateUserpassword.p_policy_length),$.each(i,function(t){t=i[t];null!=(ruleName=t(e))&&""!=ruleName?s.next().find("#password_policy_rules").find("li#"+ruleName+" span:first").hasClass("su-password-tick")||s.next().find("#password_policy_rules").find("li#"+ruleName+" span:first").addClass("su-password-tick").removeClass("icon"):(ruleName=name,s.next().find("#password_policy_rules").find("li#"+ruleName+" span:first").hasClass("su-password-tick")&&s.next().find("#password_policy_rules").find("li#"+ruleName+" span:first").removeClass("su-password-tick").addClass("icon")),ruleName=""})}$.validator.addMethod("isValidPassword",function(t,e){var s=new Array;if(s.push(validateUserpassword.p_policy_uppercase),s.push(validateUserpassword.p_policy_lowercase),s.push(validateUserpassword.p_policy_number),s.push(validateUserpassword.p_policy_specialcharacter),s.push(validateUserpassword.p_policy_length),passwordPolicyPopover("#new-password",t),$("#password_policy_rules li>span.su-password-tick").length==$("#password_policy_rules li>span:not(.content)").length)return!0},"");var isKeyUp=!1;function onChangePasswordClick(){$(".password-validate-holder").html(""),$("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("has-error");var t=!0;(t=$(".change-password-form").valid())&&$("#new-password").val()!=$("#confirm-password").val()&&($("#confirm-password-validate").html("Passwords mismatch"),$("#confirm-password-validate").closest("div").prev("div").addClass("has-error"),t=!1),0!=t&&(showWaitingPopup("content-area"),doAjaxPost("POST",updatepasswordUrl,{oldpassword:$("#old-password").val(),newpassword:$("#new-password").val(),confirmpassword:$("#confirm-password").val()},function(t){$("input[type='password']").val(""),hideWaitingPopup("content-area"),$("#password_policy_rules").remove(),$("#confirm-password-section").removeAttr("style"),$("#change-password-btn").css("margin-top","0px"),t.Data.status||"password"!=t.Data.key?SuccessAlert(window.TM.App.LocalizationContent.UpdatePassword,window.TM.App.LocalizationContent.PasswordSuccess,7e3):($("#old-password-validate").html(t.Data.value),$("#old-password-validate").closest("div").prev("div").addClass("has-error"))}))}$(document).ready(function(){var s;$(".password-fields-user-profile-edit").bind("keypress",function(t){if(13==t.keyCode)return t.preventDefault(),onChangePasswordClick(),this.blur(),!1}),$("#new-password").bind("keyup",function(){$("#new-password").val()==$("#confirm-password").val()?($("#confirm-password").closest("div").removeClass("has-error"),$("#confirm-password").closest("div").find("span:last-child").html("")):""!=$("#confirm-password").val()&&($("#confirm-password").closest("div").addClass("has-error"),$("#confirm-password").closest("div").next("div").find("span").html(window.TM.App.LocalizationContent.PasswordMismatch).css("display","block")),passwordPolicyPopover("#new-password",$("#new-password").val())}),$(".change-password-form").validate({errorElement:"span",onkeyup:function(t,e){$("#success-message").html(""),9!=e.keyCode&&(isKeyUp=!0,$(t).valid(),isKeyUp=!1)},onfocusout:function(t){$(t).valid(),$("#success-message").html("")},rules:{"old-password":{required:!0},"new-password":{required:!0,isValidPassword:!0},"confirm-password":{required:!0,equalTo:"#new-password"}},highlight:function(t){if($(t).closest("div").addClass("has-error"),"new-password"==$(t).attr("id")){for(var e=0;e<$("#password_policy_rules").find("li>span").length;e++)"su-tick"==$($("#password_policy_rules").find("li>span")[e]).attr("class")?$(t).closest("div").removeClass("has-error"):s="unsatisfied-rule";""!=s&&null!=s&&($(t).closest("div").addClass("has-error"),s="")}},unhighlight:function(t){if($(t).closest("div").removeClass("has-error"),"new-password"==$(t).attr("id")){for(var e=0;e<$("#password_policy_rules").find("li>span").length;e++)"su-tick"!=$($("#password_policy_rules").find("li>span")[e]).attr("class")&&(s="unsatisfied-rule"),"su-tick"==$($("#password_policy_rules").find("li>span")[e]).attr("class")&&$(t).closest("div").removeClass("has-error");""!=s&&null!=s&&($(t).closest("div").addClass("has-error"),s="")}$(t).closest("div").find(".password-validate-holder").html("")},errorPlacement:function(t,e){$(e).closest("div").find(".password-validate-holder").html(t.html())},messages:{"old-password":{required:window.TM.App.LocalizationContent.OldPasswordValidator},"new-password":{required:window.TM.App.LocalizationContent.NewPasswordValidator},"confirm-password":{required:window.TM.App.LocalizationContent.ConfirmPasswordValidator,equalTo:window.TM.App.LocalizationContent.PasswordMismatch}}})}),$("#new-password").on("change",function(){passwordPolicyPopover("#new-password",$("#new-password").val()),$("#new-password").valid()}),$(function(){$(document).on("click",".show-hide-password",function(){$(this).siblings("input").is(":password")?($(this).siblings("input").attr("type","text").val(),$(this).removeClass("su-show").addClass("su-hide").attr("data-original-title",window.TM.App.LocalizationContent.ClicktoHide)):($(this).siblings("input").attr("type","password"),$(this).removeClass("su-hide").addClass("su-show").attr("data-original-title",window.TM.App.LocalizationContent.ClicktoView)),$(this).tooltip("show")}),$(document).on("touchstart",".show-hide-password",function(){$(this).siblings("input").is(":password")?$(this).siblings("input").attr("type","text"):$(this).siblings("input").attr("type","password")}),$(document).on("touchend",".show-hide-password",function(){$(this).siblings("input").is(":password")?$(this).siblings("input").attr("type","text"):$(this).siblings("input").attr("type","password")}),window.innerWidth<1041&&$(document).on("click",".show-hide-password",function(){$(this).siblings("input").is(":password")?$(this).siblings("input").attr("type","text"):$(this).siblings("input").attr("type","password")}),$(document).on("click",".show-hide-password-ej2",function(){$(this).siblings().find("input").is(":password")?($(this).siblings().find("input").attr("type","text"),$(this).removeClass("su-show").addClass("su-hide").attr("data-original-title",window.TM.App.LocalizationContent.ClicktoHide)):($(this).siblings().find("input").attr("type","password"),$(this).removeClass("su-hide").addClass("su-show").attr("data-original-title",window.TM.App.LocalizationContent.ClicktoView)),$(this).tooltip("show")}),$(document).on("touch",".show-hide-password-ej2",function(){$(this).siblings().find("input").is(":password")?($(this).siblings().find("input").attr("type","text"),$(this).removeClass("su-show"),$(this).addClass("su-hide")):($(this).siblings().find("input").attr("type","password"),$(this).removeClass("su-hide"),$(this).addClass("su-show"))})});