/*!
 * mdl-components-ext - Component Extensions for the Material Design Light in CSS, JS and HTML
 * @version   1.6.4
 * @author    Gabor Ivan <gixx@gixx-web.com>
 * @copyright 2012 - 2016 Gixx-web (http://www.gixx-web.com)
 * @license   http://webhemi.gixx-web.com/license/new-bsd   New BSD License
 * @link      http://www.gixx-web.com
 */
;
(function() {
	var a = function a(b) {
		this.element_ = b;
		this.init()
	};
	window.MaterialKeyvaluelist = a;
	a.prototype.CssClasses_ = {
		IS_UPGRADED : "is-upgraded",
		JS_KVL : "mdl-js-kvl",
		KVL_SOCIALNETS : "mdl-kvl-socialnetworks",
		KVL_MESSENGERS : "mdl-kvl-instantmessengers",
		KVL_PHONES : "mdl-kvl-phones",
		KVL_LABEL : "mdl-kvl__label",
		IS_FOCUSED : "is-focused",
		TEXTFIELD_LABEL : "mdl-textfield__label",
		TEXTFIELD_FLOATING : "mdl-textfield--floating-label",
		BUTTON_KVL_ADD : "mdl-kvl__list-add",
		BUTTON_KVL : "mdl-button",
		BUTTON_KVL_JS : "mdl-js-button",
		BUTTON_KVL_ICON : "mdl-button--icon",
		BUTTON_KVL_COLORED : "mdl-button--colored",
		MATERIAL_ICONS : "material-icons"
	};
	a.prototype.dataTypes_ = {
		KLV_TYPE_TEXT : "text",
		KVL_TYPE_EMAIL : "email",
		KVL_TYPE_URL : "url",
		KVL_TYPE_TEL : "tel"
	};
	a.prototype.dataPattern_ = {
		text : ".+",
		email : "[a-z0-9\\.\\_\\%\\+\\-]+\\@[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9\\.\\-])?\\.[a-z]{2,4}",
		url : "https?\\:\\/\\/[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9\\.\\-])?\\.[a-z]{2,4}\\/?[a-zA-Z0-9\\.\\/\\?\\-\\_\\#\\%\\&\\@\\=\\+]*",
		tel : "((\\+[0-9]{2}|0[0-9]{1,4})[- ]?)?(\\([0-9]{1,3}\\)|[0-9]{1,3})[- \\/]?[0-9]{3,4}[- ]?[0-9]{3,4}"
	};
	a.prototype.listID_ = null;
	a.prototype.listDataType_ = "text";
	a.prototype.useListDataPattern_ = false;
	a.prototype.listDataPattern_ = "";
	a.prototype.listDataValuePlaceholder_ = "";
	a.prototype.listDataKeyPlaceholder_ = "";
	a.prototype.addButton_ = {};
	a.prototype.storedValue_ = {};
	a.prototype.keyValueList_ = {};
	a.prototype.Services_ = {
		"mdl-kvl-socialnetworks" : [ "Bebo", "Facebook", "Flickr", "Google+",
				"Habbo", "Instagram", "LinkedIn", "Orkut", "Qzone",
				"Sina Weibo", "Tagged", "Tumblr", "Twitter", "VK", "Xing" ],
		"mdl-kvl-instantmessengers" : [ "Aim", "AOL On", "Ch@t On",
				"Facebook Messenger", "FaceTime", "Google Hangouts", "ICQ",
				"imo", "Kakao Talk", "line", "QQ", "Skype", "Snapchat",
				"Viber", "WeChat", "WhatsApp" ],
		"mdl-kvl-phones" : [ "Mobile", "Home", "Work", "Work Fax", "Home Fax",
				"Pager", "Other", "Custom", "Callback" ]
	};
	a.prototype.addRow_ = function(b) {
		b.preventDefault();
		this.createRow_("", "")
	};
	a.prototype.createRow_ = function(c, f) {
		var e = this.keyValueList_.childNodes.length;
		var b = this.listID_ + "-list-element-" + e;
		var d = document.createElement("li");
		d.classList.add("mdl-kvl__list-element");
		d.setAttribute("id", b);
		d.innerHTML = '<div class="mdl-kvl__list-key mdl-textfield mdl-js-textfield">   <input required list="mld-kvl-data-'
				+ this.listID_
				+ '" id="'
				+ this.listID_
				+ "-key-"
				+ e
				+ '" data-value="'
				+ this.listID_
				+ "-value-"
				+ e
				+ '" type="text" class="mdl-textfield__input mdl-kvl__list-element-key" name="'
				+ this.listID_
				+ "-key["
				+ e
				+ ']" value="'
				+ c
				+ '" pattern=".+" />   <label class="mdl-textfield__label" for="'
				+ this.listID_
				+ "-key-"
				+ e
				+ '">'
				+ this.listDataKeyPlaceholder_
				+ '</label></div><div class="mdl-kvl__list-value mdl-textfield mdl-js-textfield">   <input required id="'
				+ this.listID_
				+ "-value-"
				+ e
				+ '" data-key="'
				+ this.listID_
				+ "-key-"
				+ e
				+ '" type="'
				+ this.listDataType_
				+ '" '
				+ (this.useListDataPattern_ ? ' pattern="'
						+ this.listDataPattern_ + '"' : "")
				+ 'class="mdl-textfield__input mdl-kvl__list-element-value" name="'
				+ this.listID_
				+ "-value["
				+ e
				+ ']" value="'
				+ f
				+ '" />   <label class="mdl-textfield__label" for="'
				+ this.listID_
				+ "-value-"
				+ e
				+ '">'
				+ this.listDataValuePlaceholder_
				+ '</label>   <span class="mdl-textfield__error">Input is not valid!</span></div><div class="mdl-kvl__list-remove">   <button type="button" id="'
				+ this.listID_
				+ "-delete-"
				+ e
				+ '" class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent">       <i class="material-icons">remove</i>   </button></div>';
		this.keyValueList_.appendChild(d);
		componentHandler.upgradeDom();
		window.getComputedStyle(d).opacity;
		document.getElementById(this.listID_ + "-key-" + e).addEventListener(
				"change", this.inputChange_.bind(this), true);
		document.getElementById(this.listID_ + "-value-" + e).addEventListener(
				"keyup", this.inputChange_.bind(this), true);
		document.getElementById(this.listID_ + "-delete-" + e)
				.addEventListener("click", this.deleteRow_.bind(this), true);
		d.classList.add("show")
	};
	a.prototype.resetList_ = function() {
		if (this.element_.getElementsByTagName("ul").length > 0) {
			this.element_.removeChild(this.element_.querySelector("ul"))
		}
		this.keyValueList_ = document.createElement("ul");
		this.keyValueList_.classList.add("mdl-kvl__list");
		this.element_.appendChild(this.keyValueList_);
		if (this.storedValue_) {
			for ( var b in this.storedValue_) {
				if (this.storedValue_.hasOwnProperty(b)) {
					this.createRow_(b, this.storedValue_[b])
				}
			}
		}
	};
	a.prototype.deleteRow_ = function(c) {
		c.preventDefault();
		var e = this;
		for (var b = 0; b < c.path.length; b++) {
			var f = c.path[b];
			if (f.tagName == "BODY") {
				break
			}
			if (f.tagName == "LI"
					&& f.classList.contains("mdl-kvl__list-element")) {
				if (typeof f.parentNode != "undefined") {
					var d = parseFloat(window.getComputedStyle(f).transitionDuration) * 1000;
					f.classList.remove("show");
					setTimeout(function() {
						if (f.parentNode) {
							f.parentNode.removeChild(f)
						}
						e.inputChange_(c)
					}, d)
				}
				break
			}
		}
	};
	a.prototype.inputChange_ = function(c) {
		c.preventDefault();
		var g = this.element_.querySelectorAll(".mdl-kvl__list-element input");
		var e = {};
		for (var f = 0; f < g.length; f++) {
			var h = g[f];
			var k = "";
			var j = "";
			var d = "";
			var b = "";
			if (!h.value.trim()) {
				h.parentNode.classList.add("is-invalid")
			} else {
				if (h.classList.contains("mdl-kvl__list-element-key")) {
					b = h.getAttribute("data-value");
					k = h.value.trim();
					j = this.element_.querySelector("#" + b).value.trim()
				} else {
					d = h.getAttribute("data-key");
					k = this.element_.querySelector("#" + d).value.trim();
					j = h.value.trim()
				}
			}
			if (k && j) {
				e[k] = j
			}
		}
		this.storedValue_ = e;
		this.element_.querySelector("textarea").value = JSON.stringify(e)
	};
	a.prototype.init = function() {
		if (this.element_) {
			var l = this.element_.querySelector("textarea");
			var n = l.parentNode;
			this.listID_ = l.getAttribute("id");
			var m = document.createElement("div");
			m.classList.add(this.CssClasses_.KVL_LABEL);
			m.classList.add(this.CssClasses_.IS_FOCUSED);
			m.classList.add(this.CssClasses_.TEXTFIELD_FLOATING);
			n.insertBefore(m, l);
			for ( var c in this.element_.children) {
				if ("LABEL" == this.element_.children[c].tagName) {
					var g = this.element_.children[c];
					var k = g.cloneNode(true);
					k.classList.remove();
					k.classList.add(this.CssClasses_.TEXTFIELD_LABEL);
					m.appendChild(k);
					g.remove();
					break
				}
			}
			this.addButton_ = document.createElement("button");
			this.addButton_.setAttribute("type", "button");
			this.addButton_.classList.add(this.CssClasses_.BUTTON_KVL_ADD);
			this.addButton_.classList.add(this.CssClasses_.BUTTON_KVL);
			this.addButton_.classList.add(this.CssClasses_.BUTTON_KVL_JS);
			this.addButton_.classList.add(this.CssClasses_.BUTTON_KVL_ICON);
			this.addButton_.classList.add(this.CssClasses_.BUTTON_KVL_COLORED);
			this.addButton_.innerHTML = '<i class="material-icons">add</i>';
			m.appendChild(this.addButton_);
			if (l.hasAttribute("data-key-placeholder")) {
				this.listDataKeyPlaceholder_ = l
						.getAttribute("data-key-placeholder")
			}
			if (l.hasAttribute("data-value-placeholder")) {
				this.listDataValuePlaceholder_ = l
						.getAttribute("data-value-placeholder")
			}
			if (l.hasAttribute("data-type")) {
				var f = l.getAttribute("data-type");
				for ( var c in this.dataTypes_) {
					if (this.dataTypes_[c] == f) {
						this.listDataType_ = this.dataTypes_[c];
						break
					}
				}
			}
			if (l.hasAttribute("data-pattern")) {
				this.useListDataPattern_ = true;
				var d = l.getAttribute("data-pattern");
				if ("" == d) {
					d = this.dataPattern_[this.listDataType_]
				}
				this.listDataPattern_ = d
			}
			var h = document.getElementById(this.listID_).value;
			if (h) {
				this.storedValue_ = JSON.parse(h)
			}
			for ( var c in this.Services_) {
				if (this.element_.classList.contains(c)) {
					var e = document.createElement("datalist");
					e.setAttribute("id", "mld-kvl-data-" + this.listID_);
					var o = [];
					for (var b = 0; b < this.Services_[c].length; b++) {
						o[b] = document.createElement("option");
						o[b].setAttribute("value", this.Services_[c][b]);
						e.appendChild(o[b])
					}
					this.element_.appendChild(e);
					break
				}
			}
			this.resetList_();
			this.addButton_.addEventListener("click", this.addRow_.bind(this));
			this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
		}
	};
	componentHandler.register({
		constructor : a,
		classAsString : "MaterialKeyvaluelist",
		cssClass : "mdl-js-kvl",
		widget : true
	})
})();
(function() {
	var a = function a(b) {
		this.element_ = b;
		this.init()
	};
	window.MaterialFile = a;
	a.prototype.CssClasses_ = {
		IS_UPGRADED : "is-upgraded",
		JS_FILE : "mdl-js-file",
		JS_TEXTFIELD : "mdl-js-textfield",
		FILE_FLOATING : "mdl-file--floating-label",
		FILE_LABEL : "mdl-file__label",
		TEXTFIELD : "mdl-textfield",
		TEXTFIELD_LABEL : "mdl-textfield__label",
		TEXTFIELD_FLOATING : "mdl-textfield--floating-label",
		TEXTFIELD_INPUT : "mdl-textfield__input",
		BUTTON : "mdl-button",
		BUTTON_PRIMARY : "mdl-button--primary",
		BUTTON_ICON : "mdl-button--icon",
		MATERIAL_ICONS : "material-icons"
	};
	a.prototype.multipleFilesSelected_ = "files are selected";
	a.prototype.fileID_ = null;
	a.prototype.fileNameID_ = null;
	a.prototype.isStringEndsWith_ = function(c, e) {
		try {
			return c.endsWith(e)
		} catch (f) {
			var b = c.length;
			var d = e.length;
			return (c == (c.substring(0, (b - d)) + e))
		}
	};
	a.prototype.getFieldNameVariant_ = function(d, c) {
		var e = "";
		var b = "";
		if (typeof d == "string") {
			e = d
		} else {
			e = d.getAttribute("name")
		}
		if (e) {
			if (this.isStringEndsWith_(e, "]")) {
				b = e.substr(0, (e.length - 1)) + "-" + c + "]"
			} else {
				b = e + "-" + c
			}
		} else {
			console.warn("No name defined")
		}
		return b
	};
	a.prototype.inputChange_ = function(g) {
		g.preventDefault();
		var f = g.target;
		var b = this.fileNameID_.replace(/([^a-zA-Z0-9])/g, "\\$1") + "";
		var e = this.element_.querySelector("#" + b);
		var i = f.files.length;
		if (!this.element_.classList.contains("is-focused")
				&& !this.element_.classList.contains("is-dirty")) {
			try {
				var c = new Event("focus");
				e.dispatchEvent(c)
			} catch (h) {
				e.click()
			}
		}
		if (i > 0 && typeof f.files[0].name != "undefined") {
			if (i == 1) {
				e.setAttribute("value", f.files[0].name)
			} else {
				var d = this.element_.hasAttribute("data-placeholder-multiple") ? this.element_
						.getAttribute("data-placeholder-multiple")
						: this.multipleFilesSelected_;
				e.setAttribute("value", i + " " + d)
			}
			e.parentNode.classList.add("is-dirty")
		} else {
			e.setAttribute("value", "");
			e.parentNode.classList.remove("is-dirty")
		}
	};
	a.prototype.init = function() {
		if (this.element_) {
			var h = this.element_.querySelector("input[type=file]");
			var d = h.parentNode;
			this.fileID_ = h.getAttribute("id");
			this.fileNameID_ = this.getFieldNameVariant_(this.fileID_,
					"filename");
			if (!d.classList.contains(this.CssClasses_.TEXTFIELD)) {
				d.classList.add(this.CssClasses_.TEXTFIELD)
			}
			if (!d.classList.contains(this.CssClasses_.JS_TEXTFIELD)) {
				d.classList.add(this.CssClasses_.JS_TEXTFIELD)
			}
			if (d.classList.contains(this.CssClasses_.FILE_FLOATING)) {
				d.classList.remove(this.CssClasses_.FILE_FLOATING);
				d.classList.add(this.CssClasses_.TEXTFIELD_FLOATING)
			}
			var e = d.querySelector("label");
			e.classList.remove(this.CssClasses_.FILE_LABEL);
			e.classList.add(this.CssClasses_.TEXTFIELD_LABEL);
			e.setAttribute("for", this.fileNameID_);
			var g = document.createElement("input");
			g.setAttribute("type", "text");
			g.setAttribute("id", this.fileNameID_);
			g.setAttribute("name", this.fileNameID_);
			g.setAttribute("readonly", "readonly");
			g.classList.add(this.CssClasses_.TEXTFIELD_INPUT);
			d.insertBefore(g, e);
			var b = document.createElement("div");
			b.classList.add(this.CssClasses_.BUTTON);
			b.classList.add(this.CssClasses_.BUTTON_PRIMARY);
			b.classList.add(this.CssClasses_.BUTTON_ICON);
			d.appendChild(b);
			var f = document.createElement("i");
			f.classList.add(this.CssClasses_.MATERIAL_ICONS);
			b.appendChild(f);
			var i = document.createTextNode("attach_file");
			f.appendChild(i);
			var c = h.cloneNode(true);
			c.className = "";
			b.appendChild(c);
			h.parentNode.removeChild(h);
			c.addEventListener("change", this.inputChange_.bind(this));
			componentHandler.upgradeDom();
			this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
		}
	};
	componentHandler.register({
		constructor : a,
		classAsString : "MaterialFile",
		cssClass : "mdl-js-file",
		widget : true
	})
})();
(function() {
	var a = function a(b) {
		this.element_ = b;
		this.GrAvatarSecured_ = (window.location.protocol === "https:");
		this.FormInputElementName_ = "";
		this.DefaultImage_ = "";
		this.GalleryPath_ = "";
		this.Gallery_ = [];
		this.AvatarType_ = "gallery";
		this.AppliedAvatarType_ = "gallery";
		this.I18n_ = {
			gallery : {
				name : "Gallery",
				icon : "image"
			},
			gravatar : {
				name : "GR Avatar",
				icon : "assignment_ind"
			},
			url : {
				name : "URL",
				icon : "language"
			},
			upload : {
				name : "Upload",
				icon : "file_upload"
			}
		};
		this.init()
	};
	window.MaterialAvatar = a;
	a.prototype.CssClasses_ = {
		IS_UPGRADED : "is-upgraded",
		IS_FOCUSED : "is-focused",
		IS_CHECKED : "is-checked",
		IS_SELECTED : "is-selected",
		IS_SHOW : "is-show",
		IS_ACTIVE : "is-active",
		IS_INVALID : "is-invalid",
		IS_DIRTY : "is-dirty",
		JS_AVATAR : "mdl-js-avatar",
		RADIO_BTN : "mdl-radio__button",
		AVATAR_OVERLAY : "mdl-avatar-overlay",
		AVATAR_LABEL : "mdl-avatar__label",
		AVATAR__LIST_LABEL : "mdl-avatar-list__label",
		AVATAR_INPUT : "mdl-avatar__input",
		AVATAR_IMAGE : "mdl-avatar__image",
		AVATAR_APPLY : "mdl-avatar__apply",
		AVATAR_CANCEL : "mdl-avatar__cancel",
		AVATAR_TYPE : "mdl-avatar__type",
		AVATAR_FILE : "mdl-avatar__file",
		TEXTFIELD_LABEL : "mdl-textfield__label",
		TEXTFIELD_FLOATING : "mdl-textfield--floating-label",
		TEXTFIELD_INPUT : "mdl-textfield__input",
		TEXTFIELD_ERROR : "mdl-textfield__error",
		BUTTON_AVATAR_JS : "mdl-js-button",
		MATERIAL_ICONS : "material-icons"
	};
	a.prototype.GrAvatarSecured_ = false;
	a.prototype.OverlayCloseEvent_ = "overlayCloseEvent";
	a.prototype.FormInputElementName_ = "";
	a.prototype.DefaultImage_ = "";
	a.prototype.GalleryPath_ = "";
	a.prototype.Gallery_ = [];
	a.prototype.AvatarType_ = "gallery";
	a.prototype.AppliedAvatarType_ = "gallery";
	a.prototype.I18n_ = {
		gallery : {
			name : "Gallery",
			icon : "image"
		},
		gravatar : {
			name : "GR Avatar",
			icon : "assignment_ind"
		},
		url : {
			name : "URL",
			icon : "language"
		},
		upload : {
			name : "Upload",
			icon : "file_upload"
		}
	};
	a.prototype.dataPattern_ = {
		email : "[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9])@[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9])\\.[a-z]{2,4}",
		url : "https?:\\/\\/[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9\\.\\-])?\\.[a-z]{2,4}\\/?[a-zA-Z0-9\\.\\/?\\-_#%&@=+]*\\.(jpg|jpeg|gif|png|svg)"
	};
	a.prototype.md5 = function(l) {
		var e = function(p, o) {
			return (p + o) & 4294967295
		};
		var d = function(p, r) {
			var q = p[0], o = p[1], t = p[2], s = p[3];
			q = b(q, o, t, s, r[0], 7, -680876936);
			s = b(s, q, o, t, r[1], 12, -389564586);
			t = b(t, s, q, o, r[2], 17, 606105819);
			o = b(o, t, s, q, r[3], 22, -1044525330);
			q = b(q, o, t, s, r[4], 7, -176418897);
			s = b(s, q, o, t, r[5], 12, 1200080426);
			t = b(t, s, q, o, r[6], 17, -1473231341);
			o = b(o, t, s, q, r[7], 22, -45705983);
			q = b(q, o, t, s, r[8], 7, 1770035416);
			s = b(s, q, o, t, r[9], 12, -1958414417);
			t = b(t, s, q, o, r[10], 17, -42063);
			o = b(o, t, s, q, r[11], 22, -1990404162);
			q = b(q, o, t, s, r[12], 7, 1804603682);
			s = b(s, q, o, t, r[13], 12, -40341101);
			t = b(t, s, q, o, r[14], 17, -1502002290);
			o = b(o, t, s, q, r[15], 22, 1236535329);
			q = i(q, o, t, s, r[1], 5, -165796510);
			s = i(s, q, o, t, r[6], 9, -1069501632);
			t = i(t, s, q, o, r[11], 14, 643717713);
			o = i(o, t, s, q, r[0], 20, -373897302);
			q = i(q, o, t, s, r[5], 5, -701558691);
			s = i(s, q, o, t, r[10], 9, 38016083);
			t = i(t, s, q, o, r[15], 14, -660478335);
			o = i(o, t, s, q, r[4], 20, -405537848);
			q = i(q, o, t, s, r[9], 5, 568446438);
			s = i(s, q, o, t, r[14], 9, -1019803690);
			t = i(t, s, q, o, r[3], 14, -187363961);
			o = i(o, t, s, q, r[8], 20, 1163531501);
			q = i(q, o, t, s, r[13], 5, -1444681467);
			s = i(s, q, o, t, r[2], 9, -51403784);
			t = i(t, s, q, o, r[7], 14, 1735328473);
			o = i(o, t, s, q, r[12], 20, -1926607734);
			q = f(q, o, t, s, r[5], 4, -378558);
			s = f(s, q, o, t, r[8], 11, -2022574463);
			t = f(t, s, q, o, r[11], 16, 1839030562);
			o = f(o, t, s, q, r[14], 23, -35309556);
			q = f(q, o, t, s, r[1], 4, -1530992060);
			s = f(s, q, o, t, r[4], 11, 1272893353);
			t = f(t, s, q, o, r[7], 16, -155497632);
			o = f(o, t, s, q, r[10], 23, -1094730640);
			q = f(q, o, t, s, r[13], 4, 681279174);
			s = f(s, q, o, t, r[0], 11, -358537222);
			t = f(t, s, q, o, r[3], 16, -722521979);
			o = f(o, t, s, q, r[6], 23, 76029189);
			q = f(q, o, t, s, r[9], 4, -640364487);
			s = f(s, q, o, t, r[12], 11, -421815835);
			t = f(t, s, q, o, r[15], 16, 530742520);
			o = f(o, t, s, q, r[2], 23, -995338651);
			q = m(q, o, t, s, r[0], 6, -198630844);
			s = m(s, q, o, t, r[7], 10, 1126891415);
			t = m(t, s, q, o, r[14], 15, -1416354905);
			o = m(o, t, s, q, r[5], 21, -57434055);
			q = m(q, o, t, s, r[12], 6, 1700485571);
			s = m(s, q, o, t, r[3], 10, -1894986606);
			t = m(t, s, q, o, r[10], 15, -1051523);
			o = m(o, t, s, q, r[1], 21, -2054922799);
			q = m(q, o, t, s, r[8], 6, 1873313359);
			s = m(s, q, o, t, r[15], 10, -30611744);
			t = m(t, s, q, o, r[6], 15, -1560198380);
			o = m(o, t, s, q, r[13], 21, 1309151649);
			q = m(q, o, t, s, r[4], 6, -145523070);
			s = m(s, q, o, t, r[11], 10, -1120210379);
			t = m(t, s, q, o, r[2], 15, 718787259);
			o = m(o, t, s, q, r[9], 21, -343485551);
			p[0] = e(q, p[0]);
			p[1] = e(o, p[1]);
			p[2] = e(t, p[2]);
			p[3] = e(s, p[3])
		};
		var k = function(w, r, p, o, v, u) {
			r = e(e(r, w), e(o, u));
			return e((r << v) | (r >>> (32 - v)), p)
		};
		var b = function(q, p, w, v, o, u, r) {
			return k((p & w) | ((~p) & v), q, p, o, u, r)
		};
		var i = function(q, p, w, v, o, u, r) {
			return k((p & v) | (w & (~v)), q, p, o, u, r)
		};
		var f = function(q, p, w, v, o, u, r) {
			return k(p ^ w ^ v, q, p, o, u, r)
		};
		var m = function(q, p, w, v, o, u, r) {
			return k(w ^ (p | (~v)), q, p, o, u, r)
		};
		var j = function(q) {
			var t = q.length, r = [ 1732584193, -271733879, -1732584194,
					271733878 ], p;
			for (p = 64; p <= q.length; p += 64) {
				d(r, n(q.substring(p - 64, p)))
			}
			q = q.substring(p - 64);
			var o = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			for (p = 0; p < q.length; p++) {
				o[p >> 2] |= q.charCodeAt(p) << ((p % 4) << 3)
			}
			o[p >> 2] |= 128 << ((p % 4) << 3);
			if (p > 55) {
				d(r, o);
				for (p = 0; p < 16; p++) {
					o[p] = 0
				}
			}
			o[14] = t * 8;
			d(r, o);
			return r
		};
		var n = function(p) {
			var q = [], o;
			for (o = 0; o < 64; o += 4) {
				q[o >> 2] = p.charCodeAt(o) + (p.charCodeAt(o + 1) << 8)
						+ (p.charCodeAt(o + 2) << 16)
						+ (p.charCodeAt(o + 3) << 24)
			}
			return q
		};
		var h = "0123456789abcdef".split("");
		var g = function(q) {
			var p = "", o = 0;
			for (; o < 4; o++) {
				p += h[(q >> (o * 8 + 4)) & 15] + h[(q >> (o * 8)) & 15]
			}
			return p
		};
		var c = function(o) {
			for (var p = 0; p < o.length; p++) {
				o[p] = g(o[p])
			}
			return o.join("")
		};
		if (c(j("hello")) != "5d41402abc4b2a76b9719d911017c592") {
			e = function(o, r) {
				var q = (o & 65535) + (r & 65535), p = (o >> 16) + (r >> 16)
						+ (q >> 16);
				return (p << 16) | (q & 65535)
			}
		}
		return c(j(l))
	};
	a.prototype.isWithinElement_ = function(c, d) {
		if (typeof c.path != "undefined") {
			return ~c.path.indexOf(d)
		} else {
			if (c.target == d) {
				return true
			} else {
				var b = c.target.parentNode;
				while (b) {
					if (b == d) {
						return true
					}
					b = b.parentNode
				}
			}
		}
		return false
	};
	a.prototype.isStringEndsWith_ = function(c, e) {
		try {
			return c.endsWith(e)
		} catch (f) {
			var b = c.length;
			var d = e.length;
			return (c == (c.substring(0, (b - d)) + e))
		}
	};
	a.prototype.getFieldNameVariant_ = function(d, c) {
		var e = "";
		var b = "";
		if (typeof d == "string") {
			e = d
		} else {
			e = d.getAttribute("name")
		}
		if (e) {
			if (this.isStringEndsWith_(e, "]")) {
				b = e.substr(0, (e.length - 1)) + "-" + c + "]"
			} else {
				b = e + "-" + c
			}
		} else {
			console.warn("No name defined")
		}
		return b
	};
	a.prototype.clickEventHandler_ = function(c) {
		if (this.isWithinElement_(c, this.element_)) {
			var b = c.target;
			if (b.classList.contains(this.CssClasses_.AVATAR_OVERLAY)) {
				this.openOverlay_(c)
			} else {
				if (b.classList.contains(this.CssClasses_.RADIO_BTN)) {
					this.openStepTwo_(c)
				} else {
					if (b.classList.contains(this.CssClasses_.AVATAR_APPLY)) {
						this.applyChange_(c)
					} else {
						if (b.classList
								.contains(this.CssClasses_.AVATAR_CANCEL)) {
							this.resetOverlay_(c)
						}
					}
				}
			}
		} else {
			this.resetOverlay_(c)
		}
	};
	a.prototype.openOverlay_ = function(b) {
		var c = b.target;
		if (c.classList.contains(this.CssClasses_.AVATAR_OVERLAY)
				&& !c.classList.contains(this.CssClasses_.IS_SHOW)) {
			c.querySelector(".select").classList
					.add(this.CssClasses_.IS_ACTIVE);
			c.classList.add(this.CssClasses_.IS_SHOW)
		}
	};
	a.prototype.openStepTwo_ = function(c) {
		var f = this.element_.querySelector("."
				+ this.CssClasses_.AVATAR_OVERLAY);
		if (f.classList.contains(this.CssClasses_.IS_SHOW)) {
			f.querySelector(".select").classList
					.remove(this.CssClasses_.IS_ACTIVE);
			var b = c.target.value;
			var e = f.querySelector("." + b);
			if (e) {
				this.AvatarType_ = b;
				var d = this.element_.querySelector("input[type=hidden]");
				if (d) {
					d.value = b
				}
				e.classList.add(this.CssClasses_.IS_ACTIVE)
			}
		}
	};
	a.prototype.applyChange_ = function(c) {
		c.preventDefault();
		var b = false;
		switch (this.AvatarType_) {
		case "gallery":
			b = this.applyGalleryChange_(c);
			break;
		case "gravatar":
			b = this.applyGravatarChange_(c);
			break;
		case "url":
			b = this.applyUrlChange_(c);
			break;
		case "upload":
			b = this.applyUploadChange_(c);
			break
		}
		if (b) {
			this.AppliedAvatarType_ = this.AvatarType_;
			try {
				var d = new Event(this.OverlayCloseEvent_);
				document.dispatchEvent(d)
			} catch (e) {
				document.body.click()
			}
		}
	};
	a.prototype.applyGalleryChange_ = function(d) {
		var e = this.element_.querySelector("."
				+ this.CssClasses_.AVATAR_OVERLAY);
		if (e.classList.contains(this.CssClasses_.IS_SHOW)) {
			this.DefaultImage_ = d.target.src;
			this.element_.querySelector("." + this.CssClasses_.AVATAR_INPUT).value = this.DefaultImage_;
			this.element_.querySelector("." + this.CssClasses_.AVATAR_IMAGE).src = this.DefaultImage_;
			var f = this.element_.querySelectorAll(".gallery img."
					+ this.CssClasses_.AVATAR_APPLY);
			for (var c = 0, b = f.length; c < b; c++) {
				if (f[c].classList.contains(this.CssClasses_.IS_SELECTED)) {
					f[c].classList.remove(this.CssClasses_.IS_SELECTED)
				}
				if (f[c].src == this.DefaultImage_) {
					f[c].classList.add(this.CssClasses_.IS_SELECTED)
				}
			}
		}
		return true
	};
	a.prototype.applyGravatarChange_ = function(b) {
		var h = this.element_.querySelector("."
				+ this.CssClasses_.AVATAR_OVERLAY);
		if (h.classList.contains(this.CssClasses_.IS_SHOW)) {
			var g = h.querySelector(".gravatar ."
					+ this.CssClasses_.TEXTFIELD_INPUT);
			var c = (typeof g.willValidate !== "undefined");
			var l = c ? g.checkValidity() : true;
			if (!l) {
				if (c) {
					var n = h.querySelector(".gravatar ."
							+ this.CssClasses_.TEXTFIELD_ERROR);
					if (n) {
						n.innerHTML = g.validationMessage
					}
				}
				return false
			} else {
				b.preventDefault();
				var i = this.GrAvatarSecured_ ? "https://secure.gravatar.com/avatar/"
						: "http://www.gravatar.com/avatar/";
				var e = i + this.md5(g.value) + "?r=g&d="
						+ encodeURIComponent("") + "&size=256";
				var m = this.element_.querySelector("."
						+ this.CssClasses_.AVATAR_IMAGE);
				var k = this.element_.querySelector("."
						+ this.CssClasses_.AVATAR_INPUT);
				var d = this;
				var j = new Image;
				j.onload = function() {
					d.DefaultImage_ = e;
					m.src = e;
					k.value = e
				};
				try {
					j.src = e
				} catch (f) {
				}
			}
		}
		return true
	};
	a.prototype.applyUrlChange_ = function(b) {
		var g = this.element_.querySelector("."
				+ this.CssClasses_.AVATAR_OVERLAY);
		if (g.classList.contains(this.CssClasses_.IS_SHOW)) {
			var f = g
					.querySelector(".url ." + this.CssClasses_.TEXTFIELD_INPUT);
			var c = (typeof f.willValidate !== "undefined");
			var k = c ? f.checkValidity() : true;
			if (!k) {
				if (c) {
					var m = g.querySelector(".url ."
							+ this.CssClasses_.TEXTFIELD_ERROR);
					if (m) {
						m.innerHTML = f.validationMessage
					}
				}
				return false
			} else {
				b.preventDefault();
				var i = f.value;
				var l = this.element_.querySelector("."
						+ this.CssClasses_.AVATAR_IMAGE);
				var j = this.element_.querySelector("."
						+ this.CssClasses_.AVATAR_INPUT);
				var d = this;
				var h = new Image;
				h.onload = function() {
					d.DefaultImage_ = i;
					l.src = i;
					j.value = i
				};
				try {
					h.src = f.value
				} catch (e) {
				}
			}
		}
		return true
	};
	a.prototype.applyUploadChange_ = function(f) {
		var h = this.element_.querySelector("."
				+ this.CssClasses_.AVATAR_OVERLAY);
		if (h.classList.contains(this.CssClasses_.IS_SHOW)) {
			f.preventDefault();
			try {
				var d = this.element_.querySelector("."
						+ this.CssClasses_.AVATAR_IMAGE);
				var g = this.element_.querySelector("."
						+ this.CssClasses_.AVATAR_INPUT);
				var e = document.querySelector(".upload input[type=file]").files[0];
				var c = new FileReader();
				var b = this;
				c.onload = function() {
					b.DefaultImage_ = c.result;
					d.src = c.result;
					g.value = e.name
				};
				if (e) {
					c.readAsDataURL(e)
				}
			} catch (i) {
			}
		}
		return true
	};
	a.prototype.resetOverlay_ = function(c) {
		var f = this.element_.querySelector("."
				+ this.CssClasses_.AVATAR_OVERLAY);
		if (f.classList.contains(this.CssClasses_.IS_SHOW)) {
			if (this.isWithinElement_(c, f)
					&& !c.target.classList
							.contains(this.CssClasses_.AVATAR_CANCEL)) {
				return true
			}
			c.preventDefault();
			this.element_.querySelector("input."
					+ this.CssClasses_.AVATAR_INPUT).value = this.DefaultImage_;
			this.element_.querySelector("img." + this.CssClasses_.AVATAR_IMAGE).src = this.DefaultImage_;
			if (this.AvatarType_ != this.AppliedAvatarType_) {
				var d = this.element_.querySelector("input[type=hidden]");
				if (d) {
					d.value = this.AppliedAvatarType_
				}
				this.AvatarType_ = this.AppliedAvatarType_
			}
			var b = f.querySelector(".select ." + this.CssClasses_.IS_CHECKED);
			if (b) {
				b.querySelector("input").checked = false;
				b.classList.remove(this.CssClasses_.IS_CHECKED)
			}
			var g = f.querySelector(".gravatar input."
					+ this.CssClasses_.TEXTFIELD_INPUT);
			if (g) {
				g.value = "";
				g.parentNode.classList.remove(this.CssClasses_.IS_FOCUSED);
				g.parentNode.classList.remove(this.CssClasses_.IS_DIRTY);
				g.parentNode.classList.remove(this.CssClasses_.IS_INVALID)
			}
			var e = f.querySelector(".url input."
					+ this.CssClasses_.TEXTFIELD_INPUT);
			if (e) {
				e.value = "";
				e.parentNode.classList.remove(this.CssClasses_.IS_FOCUSED);
				e.parentNode.classList.remove(this.CssClasses_.IS_DIRTY);
				e.parentNode.classList.remove(this.CssClasses_.IS_INVALID)
			}
			var h = f.querySelector("." + this.CssClasses_.IS_ACTIVE);
			if (h) {
				h.classList.remove(this.CssClasses_.IS_ACTIVE)
			}
			f.classList.remove(this.CssClasses_.IS_SHOW)
		}
	};
	a.prototype.init = function() {
		if (this.element_) {
			var k = this.element_.querySelector("."
					+ this.CssClasses_.AVATAR_INPUT);
			var r = k.parentNode;
			this.FormInputElementName_ = k.getAttribute("name");
			this.DefaultImage_ = k.value;
			if (k.hasAttribute("data-i18n-gallery")) {
				this.I18n_.gallery.name = k.getAttribute("data-i18n-gallery")
			}
			if (k.hasAttribute("data-i18n-gravatar")) {
				this.I18n_.gravatar.name = k.getAttribute("data-i18n-gravatar")
			}
			if (k.hasAttribute("data-i18n-url")) {
				this.I18n_.url.name = k.getAttribute("data-i18n-url")
			}
			if (k.hasAttribute("data-i18n-upload")) {
				this.I18n_.upload.name = k.getAttribute("data-i18n-upload")
			}
			this.Gallery_.push(this.DefaultImage_);
			if (k.hasAttribute("data-gallery-src")) {
				this.GalleryPath_ = k.getAttribute("data-gallery-src");
				if (!this.isStringEndsWith_(this.GalleryPath_, "/")) {
					this.GalleryPath_ += "/"
				}
			}
			if (k.hasAttribute("data-gallery-list")) {
				var f = k.getAttribute("data-gallery-list").split(",");
				for (var h = 0, l = f.length; h < l; h++) {
					var g = f[h];
					if (this.GalleryPath_ != "" && g.indexOf("/") !== 0) {
						g = this.GalleryPath_ + g
					}
					this.Gallery_.push(g)
				}
			}
			var q = this.element_.querySelector("."
					+ this.CssClasses_.AVATAR_TYPE);
			if (!q) {
				q = document.createElement("input");
				q.setAttribute("type", "hidden");
				q.setAttribute("name", this.getFieldNameVariant_(
						this.FormInputElementName_, "type"));
				q.classList.add(this.CssClasses_.AVATAR_TYPE);
				q.value = "gallery";
				this.element_.appendChild(q)
			}
			var e = this.getFieldNameVariant_(this.FormInputElementName_,
					"file");
			var s = this.element_.querySelector("input[type=file]");
			if (s) {
				e = s.getAttribute("name");
				s.parentNode.removeChild(s)
			}
			var p = document.createElement("img");
			p.src = this.DefaultImage_;
			p.classList.add(this.CssClasses_.AVATAR_IMAGE);
			this.element_.appendChild(p);
			var n = document.createElement("div");
			n.classList.add(this.CssClasses_.AVATAR_OVERLAY);
			var j = '<div class="select"><ul class="mdl-list">';
			for ( var h in this.I18n_) {
				j += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">'
						+ this.I18n_[h].icon
						+ '</i><label class="mdl-avatar-list__label" for="'
						+ this.getFieldNameVariant_(this.FormInputElementName_,
								"type-" + h)
						+ '">'
						+ this.I18n_[h].name
						+ '</label></span><span class="mdl-list__item-secondary-action"><label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="'
						+ this.getFieldNameVariant_(this.FormInputElementName_,
								"type-" + h)
						+ '"><input type="radio" id="'
						+ this.getFieldNameVariant_(this.FormInputElementName_,
								"type-" + h)
						+ '" class="mdl-radio__button" name="'
						+ this.getFieldNameVariant_(this.FormInputElementName_,
								"type")
						+ '" value="'
						+ h
						+ '" /></label></span></li>'
			}
			j += "</ul></div>";
			var m = '<div class="gallery">';
			for (var h = 0, l = this.Gallery_.length; h < l; h++) {
				m += '<img src="'
						+ this.Gallery_[h]
						+ '" class="mdl-avatar__apply'
						+ (this.Gallery_[h] == this.DefaultImage_ ? " "
								+ this.CssClasses_.IS_SELECTED : "") + '">'
			}
			m += "</div>";
			var c = '<div class="gravatar"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="email" pattern="'
					+ this.dataPattern_.email
					+ '" placeholder="bar@foo.org" value=""><label class="mdl-textfield__label">'
					+ this.I18n_.gravatar.name
					+ '</label><span class="mdl-textfield__error"></span></div><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab '
					+ this.CssClasses_.AVATAR_APPLY
					+ '"><i class="material-icons '
					+ this.CssClasses_.AVATAR_APPLY
					+ '">done</i></button><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored '
					+ this.CssClasses_.AVATAR_CANCEL
					+ '"><i class="material-icons '
					+ this.CssClasses_.AVATAR_CANCEL
					+ '">delete_forever</i></button></div>';
			var b = '<div class="url"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="url" pattern="'
					+ this.dataPattern_.url
					+ '" placeholder="http://www.foo.org/bar.jpg" value=""><label class="mdl-textfield__label">'
					+ this.I18n_.url.name
					+ '</label><span class="mdl-textfield__error"></span></div><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab '
					+ this.CssClasses_.AVATAR_APPLY
					+ '"><i class="material-icons '
					+ this.CssClasses_.AVATAR_APPLY
					+ '">done</i></button><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored '
					+ this.CssClasses_.AVATAR_CANCEL
					+ '"><i class="material-icons '
					+ this.CssClasses_.AVATAR_CANCEL
					+ '">delete_forever</i></button></div>';
			var d = '<div class="upload"><div class="mdl-file mdl-js-file mdl-file--floating-label"><input type="file" name="'
					+ e
					+ '" id="'
					+ e
					+ '" accept=".jpg,.png,.gif,.svg"><label class="mdl-file__label" for="'
					+ e
					+ '">'
					+ this.I18n_.upload.name
					+ '</label></div><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab '
					+ this.CssClasses_.AVATAR_APPLY
					+ '"><i class="material-icons '
					+ this.CssClasses_.AVATAR_APPLY
					+ '">done</i></button><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored '
					+ this.CssClasses_.AVATAR_CANCEL
					+ '"><i class="material-icons '
					+ this.CssClasses_.AVATAR_CANCEL
					+ '">delete_forever</i></button></div>';
			n.innerHTML = j + m + c + b + d;
			this.element_.appendChild(n);
			var o = r.querySelector("." + this.CssClasses_.AVATAR_LABEL);
			o.classList.add(this.CssClasses_.TEXTFIELD_LABEL);
			r.classList.add(this.CssClasses_.IS_FOCUSED);
			r.classList.add(this.CssClasses_.TEXTFIELD_FLOATING);
			componentHandler.upgradeDom();
			document.addEventListener("click", this.clickEventHandler_
					.bind(this));
			document.addEventListener(this.OverlayCloseEvent_,
					this.resetOverlay_.bind(this))
		}
	};
	componentHandler.register({
		constructor : a,
		classAsString : "MaterialAvatar",
		cssClass : "mdl-js-avatar",
		widget : true
	})
})();