
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules/carbon-components-svelte/src/ContextMenu/ContextMenu.svelte generated by Svelte v3.46.4 */

    const { window: window_1 } = globals;
    const file$8 = "node_modules/carbon-components-svelte/src/ContextMenu/ContextMenu.svelte";

    function create_fragment$8(ctx) {
    	let ul;
    	let ul_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	let ul_levels = [
    		{ role: "menu" },
    		{ tabindex: "-1" },
    		{ "data-direction": /*direction*/ ctx[10] },
    		{ "data-level": /*level*/ ctx[7] },
    		/*$$restProps*/ ctx[13],
    		{
    			style: ul_style_value = "left: " + /*x*/ ctx[1] + "px; top: " + /*y*/ ctx[2] + "px; " + /*$$restProps*/ ctx[13].style
    		}
    	];

    	let ul_data = {};

    	for (let i = 0; i < ul_levels.length; i += 1) {
    		ul_data = assign(ul_data, ul_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			set_attributes(ul, ul_data);
    			toggle_class(ul, "bx--menu", true);
    			toggle_class(ul, "bx--menu--open", /*open*/ ctx[0]);
    			toggle_class(ul, "bx--menu--invisible", /*open*/ ctx[0] && /*x*/ ctx[1] === 0 && /*y*/ ctx[2] === 0);
    			toggle_class(ul, "bx--menu--root", /*level*/ ctx[7] === 1);
    			add_location(ul, file$8, 155, 0, 3300);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			/*ul_binding*/ ctx[21](ul);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "contextmenu", prevent_default(/*contextmenu_handler*/ ctx[18]), false, true, false),
    					listen_dev(window_1, "click", /*click_handler_1*/ ctx[19], false, false, false),
    					listen_dev(window_1, "keydown", /*keydown_handler_1*/ ctx[20], false, false, false),
    					listen_dev(ul, "click", /*click_handler*/ ctx[16], false, false, false),
    					listen_dev(ul, "click", /*click_handler_2*/ ctx[22], false, false, false),
    					listen_dev(ul, "keydown", /*keydown_handler*/ ctx[17], false, false, false),
    					listen_dev(ul, "keydown", /*keydown_handler_2*/ ctx[23], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(ul, ul_data = get_spread_update(ul_levels, [
    				{ role: "menu" },
    				{ tabindex: "-1" },
    				{ "data-direction": /*direction*/ ctx[10] },
    				(!current || dirty[0] & /*level*/ 128) && { "data-level": /*level*/ ctx[7] },
    				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13],
    				(!current || dirty[0] & /*x, y, $$restProps*/ 8198 && ul_style_value !== (ul_style_value = "left: " + /*x*/ ctx[1] + "px; top: " + /*y*/ ctx[2] + "px; " + /*$$restProps*/ ctx[13].style)) && { style: ul_style_value }
    			]));

    			toggle_class(ul, "bx--menu", true);
    			toggle_class(ul, "bx--menu--open", /*open*/ ctx[0]);
    			toggle_class(ul, "bx--menu--invisible", /*open*/ ctx[0] && /*x*/ ctx[1] === 0 && /*y*/ ctx[2] === 0);
    			toggle_class(ul, "bx--menu--root", /*level*/ ctx[7] === 1);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    			/*ul_binding*/ ctx[21](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let level;
    	const omit_props_names = ["target","open","x","y","ref"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $hasPopup;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContextMenu', slots, ['default']);
    	let { target = null } = $$props;
    	let { open = false } = $$props;
    	let { x = 0 } = $$props;
    	let { y = 0 } = $$props;
    	let { ref = null } = $$props;
    	const dispatch = createEventDispatcher();
    	const position = writable([x, y]);
    	const currentIndex = writable(-1);
    	const hasPopup = writable(false);
    	validate_store(hasPopup, 'hasPopup');
    	component_subscribe($$self, hasPopup, value => $$invalidate(8, $hasPopup = value));
    	const menuOffsetX = writable(0);
    	const ctx = getContext("ContextMenu");
    	let options = [];
    	let direction = 1;
    	let prevX = 0;
    	let prevY = 0;
    	let focusIndex = -1;
    	let openDetail = null;

    	function close() {
    		$$invalidate(0, open = false);
    		$$invalidate(1, x = 0);
    		$$invalidate(2, y = 0);
    		prevX = 0;
    		prevY = 0;
    		$$invalidate(5, focusIndex = -1);
    	}

    	/** @type {(e: MouseEvent) => void} */
    	function openMenu(e) {
    		const { height, width } = ref.getBoundingClientRect();

    		if (open || x === 0) {
    			if (window.innerWidth - width < e.x) {
    				$$invalidate(1, x = e.x - width);
    			} else {
    				$$invalidate(1, x = e.x);
    			}
    		}

    		if (open || y === 0) {
    			menuOffsetX.set(e.x);

    			if (window.innerHeight - height < e.y) {
    				$$invalidate(2, y = e.y - height);
    			} else {
    				$$invalidate(2, y = e.y);
    			}
    		}

    		position.set([x, y]);
    		$$invalidate(0, open = true);
    		openDetail = e.target;
    	}

    	onMount(() => {
    		return () => {
    			if (target != null) {
    				if (Array.isArray(target)) {
    					target.forEach(node => node?.removeEventListener("contextmenu", openMenu));
    				} else {
    					target.removeEventListener("contextmenu", openMenu);
    				}
    			}
    		};
    	});

    	setContext("ContextMenu", {
    		menuOffsetX,
    		currentIndex,
    		position,
    		close,
    		setPopup: popup => {
    			hasPopup.set(popup);
    		}
    	});

    	afterUpdate(() => {
    		if (open) {
    			$$invalidate(6, options = [...ref.querySelectorAll("li[data-nested='false']")]);

    			if (level === 1) {
    				if (prevX !== x || prevY !== y) ref.focus();
    				prevX = x;
    				prevY = y;
    			}

    			dispatch("open", openDetail);
    		} else {
    			dispatch("close");
    		}

    		if (!$hasPopup && options[focusIndex]) options[focusIndex].focus();
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const contextmenu_handler = e => {
    		if (target != null) return;
    		if (level > 1) return;
    		if (!ref) return;
    		openMenu(e);
    	};

    	const click_handler_1 = e => {
    		if (!open) return;
    		close();
    	};

    	const keydown_handler_1 = e => {
    		if (open && e.key === 'Escape') close();
    	};

    	function ul_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(3, ref);
    		});
    	}

    	const click_handler_2 = ({ target }) => {
    		const closestOption = target.closest('[tabindex]');

    		if (closestOption && closestOption.getAttribute('role') !== 'menuitem') {
    			close();
    		}
    	};

    	const keydown_handler_2 = e => {
    		if (open) e.preventDefault();
    		if ($hasPopup) return;

    		if (e.key === 'ArrowDown') {
    			if (focusIndex < options.length - 1) $$invalidate(5, focusIndex++, focusIndex);
    		} else if (e.key === 'ArrowUp') {
    			if (focusIndex === -1) {
    				$$invalidate(5, focusIndex = options.length - 1);
    			} else {
    				if (focusIndex > 0) $$invalidate(5, focusIndex--, focusIndex);
    			}
    		}
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(13, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('target' in $$new_props) $$invalidate(4, target = $$new_props.target);
    		if ('open' in $$new_props) $$invalidate(0, open = $$new_props.open);
    		if ('x' in $$new_props) $$invalidate(1, x = $$new_props.x);
    		if ('y' in $$new_props) $$invalidate(2, y = $$new_props.y);
    		if ('ref' in $$new_props) $$invalidate(3, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		target,
    		open,
    		x,
    		y,
    		ref,
    		onMount,
    		setContext,
    		getContext,
    		afterUpdate,
    		createEventDispatcher,
    		writable,
    		dispatch,
    		position,
    		currentIndex,
    		hasPopup,
    		menuOffsetX,
    		ctx,
    		options,
    		direction,
    		prevX,
    		prevY,
    		focusIndex,
    		openDetail,
    		close,
    		openMenu,
    		level,
    		$hasPopup
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('target' in $$props) $$invalidate(4, target = $$new_props.target);
    		if ('open' in $$props) $$invalidate(0, open = $$new_props.open);
    		if ('x' in $$props) $$invalidate(1, x = $$new_props.x);
    		if ('y' in $$props) $$invalidate(2, y = $$new_props.y);
    		if ('ref' in $$props) $$invalidate(3, ref = $$new_props.ref);
    		if ('options' in $$props) $$invalidate(6, options = $$new_props.options);
    		if ('direction' in $$props) $$invalidate(10, direction = $$new_props.direction);
    		if ('prevX' in $$props) prevX = $$new_props.prevX;
    		if ('prevY' in $$props) prevY = $$new_props.prevY;
    		if ('focusIndex' in $$props) $$invalidate(5, focusIndex = $$new_props.focusIndex);
    		if ('openDetail' in $$props) openDetail = $$new_props.openDetail;
    		if ('level' in $$props) $$invalidate(7, level = $$new_props.level);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*target*/ 16) {
    			if (target != null) {
    				if (Array.isArray(target)) {
    					target.forEach(node => node?.addEventListener("contextmenu", openMenu));
    				} else {
    					target.addEventListener("contextmenu", openMenu);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*focusIndex*/ 32) {
    			currentIndex.set(focusIndex);
    		}
    	};

    	$$invalidate(7, level = !ctx ? 1 : 2);

    	return [
    		open,
    		x,
    		y,
    		ref,
    		target,
    		focusIndex,
    		options,
    		level,
    		$hasPopup,
    		hasPopup,
    		direction,
    		close,
    		openMenu,
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		keydown_handler,
    		contextmenu_handler,
    		click_handler_1,
    		keydown_handler_1,
    		ul_binding,
    		click_handler_2,
    		keydown_handler_2
    	];
    }

    class ContextMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { target: 4, open: 0, x: 1, y: 2, ref: 3 }, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContextMenu",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get target() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set target(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get x() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ContextMenu$1 = ContextMenu;

    /* node_modules/carbon-components-svelte/src/ContextMenu/ContextMenuDivider.svelte generated by Svelte v3.46.4 */

    const file$7 = "node_modules/carbon-components-svelte/src/ContextMenu/ContextMenuDivider.svelte";

    function create_fragment$7(ctx) {
    	let li;

    	const block = {
    		c: function create() {
    			li = element("li");
    			attr_dev(li, "role", "separator");
    			toggle_class(li, "bx--menu-divider", true);
    			add_location(li, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContextMenuDivider', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContextMenuDivider> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ContextMenuDivider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContextMenuDivider",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    var ContextMenuDivider$1 = ContextMenuDivider;

    /* node_modules/carbon-components-svelte/src/ContextMenu/ContextMenuGroup.svelte generated by Svelte v3.46.4 */
    const file$6 = "node_modules/carbon-components-svelte/src/ContextMenu/ContextMenuGroup.svelte";

    function create_fragment$6(ctx) {
    	let li;
    	let ul;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			attr_dev(ul, "role", "group");
    			attr_dev(ul, "aria-label", /*labelText*/ ctx[0]);
    			add_location(ul, file$6, 32, 2, 701);
    			attr_dev(li, "role", "none");
    			add_location(li, file$6, 31, 0, 682);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, ul);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*labelText*/ 1) {
    				attr_dev(ul, "aria-label", /*labelText*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContextMenuGroup', slots, ['default']);
    	let { selectedIds = [] } = $$props;
    	let { labelText = "" } = $$props;
    	const currentIds = writable([]);

    	setContext("ContextMenuGroup", {
    		currentIds,
    		addOption: ({ id }) => {
    			if (!selectedIds.includes(id)) {
    				$$invalidate(1, selectedIds = [...selectedIds, id]);
    			}
    		},
    		toggleOption: ({ id }) => {
    			if (!selectedIds.includes(id)) {
    				$$invalidate(1, selectedIds = [...selectedIds, id]);
    			} else {
    				$$invalidate(1, selectedIds = selectedIds.filter(_ => _ !== id));
    			}
    		}
    	});

    	const writable_props = ['selectedIds', 'labelText'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContextMenuGroup> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('selectedIds' in $$props) $$invalidate(1, selectedIds = $$props.selectedIds);
    		if ('labelText' in $$props) $$invalidate(0, labelText = $$props.labelText);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		selectedIds,
    		labelText,
    		setContext,
    		writable,
    		currentIds
    	});

    	$$self.$inject_state = $$props => {
    		if ('selectedIds' in $$props) $$invalidate(1, selectedIds = $$props.selectedIds);
    		if ('labelText' in $$props) $$invalidate(0, labelText = $$props.labelText);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedIds*/ 2) {
    			currentIds.set(selectedIds);
    		}
    	};

    	return [labelText, selectedIds, $$scope, slots];
    }

    class ContextMenuGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { selectedIds: 1, labelText: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContextMenuGroup",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get selectedIds() {
    		throw new Error("<ContextMenuGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedIds(value) {
    		throw new Error("<ContextMenuGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<ContextMenuGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<ContextMenuGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ContextMenuGroup$1 = ContextMenuGroup;

    /* node_modules/carbon-components-svelte/src/icons/Checkmark16.svelte generated by Svelte v3.46.4 */

    const file$5 = "node_modules/carbon-components-svelte/src/icons/Checkmark16.svelte";

    // (45:4) {#if title}
    function create_if_block$4(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			add_location(title_1, file$5, 45, 6, 1140);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(45:4) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (44:8)      
    function fallback_block$4(ctx) {
    	let if_block_anchor;
    	let if_block = /*title*/ ctx[2] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*title*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$4.name,
    		type: "fallback",
    		source: "(44:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	const default_slot_or_fallback = default_slot || fallback_block$4(ctx);

    	let svg_levels = [
    		{ "data-carbon-icon": "Checkmark16" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ width: "16" },
    		{ height: "16" },
    		{ class: /*className*/ ctx[0] },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ style: /*style*/ ctx[3] },
    		{ id: /*id*/ ctx[1] },
    		/*attributes*/ ctx[4]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(path, "d", "M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z");
    			add_location(path, file$5, 42, 2, 1031);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$5, 23, 0, 691);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(svg, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[12], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[13], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[14], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[15], false, false, false),
    					listen_dev(svg, "keyup", /*keyup_handler*/ ctx[16], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*title*/ 4)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ "data-carbon-icon": "Checkmark16" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ width: "16" },
    				{ height: "16" },
    				(!current || dirty & /*className*/ 1) && { class: /*className*/ ctx[0] },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				(!current || dirty & /*style*/ 8) && { style: /*style*/ ctx[3] },
    				(!current || dirty & /*id*/ 2) && { id: /*id*/ ctx[1] },
    				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let ariaLabelledBy;
    	let labelled;
    	let attributes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Checkmark16', slots, ['default']);
    	let { class: className = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { tabindex = undefined } = $$props;
    	let { focusable = false } = $$props;
    	let { title = undefined } = $$props;
    	let { style = undefined } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
    		if ('id' in $$new_props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$new_props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$new_props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$new_props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		id,
    		tabindex,
    		focusable,
    		title,
    		style,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		attributes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
    		if ('id' in $$props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('labelled' in $$props) $$invalidate(7, labelled = $$new_props.labelled);
    		if ('ariaLabelledBy' in $$props) $$invalidate(8, ariaLabelledBy = $$new_props.ariaLabelledBy);
    		if ('ariaLabel' in $$props) $$invalidate(9, ariaLabel = $$new_props.ariaLabel);
    		if ('attributes' in $$props) $$invalidate(4, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(9, ariaLabel = $$props["aria-label"]);
    		$$invalidate(8, ariaLabelledBy = $$props["aria-labelledby"]);

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, title*/ 772) {
    			$$invalidate(7, labelled = ariaLabel || ariaLabelledBy || title);
    		}

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, labelled, tabindex, focusable*/ 992) {
    			$$invalidate(4, attributes = {
    				"aria-label": ariaLabel,
    				"aria-labelledby": ariaLabelledBy,
    				"aria-hidden": labelled ? undefined : true,
    				role: labelled ? "img" : undefined,
    				focusable: tabindex === "0" ? true : focusable,
    				tabindex
    			});
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		className,
    		id,
    		title,
    		style,
    		attributes,
    		tabindex,
    		focusable,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keyup_handler,
    		keydown_handler
    	];
    }

    class Checkmark16 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			class: 0,
    			id: 1,
    			tabindex: 5,
    			focusable: 6,
    			title: 2,
    			style: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkmark16",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get class() {
    		throw new Error("<Checkmark16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Checkmark16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Checkmark16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Checkmark16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Checkmark16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Checkmark16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focusable() {
    		throw new Error("<Checkmark16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set focusable(value) {
    		throw new Error("<Checkmark16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Checkmark16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Checkmark16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Checkmark16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Checkmark16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Checkmark16$1 = Checkmark16;

    /* node_modules/carbon-components-svelte/src/icons/CaretRight16.svelte generated by Svelte v3.46.4 */

    const file$4 = "node_modules/carbon-components-svelte/src/icons/CaretRight16.svelte";

    // (45:4) {#if title}
    function create_if_block$3(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			add_location(title_1, file$4, 45, 6, 1100);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(45:4) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (44:8)      
    function fallback_block$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*title*/ ctx[2] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*title*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$3.name,
    		type: "fallback",
    		source: "(44:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	const default_slot_or_fallback = default_slot || fallback_block$3(ctx);

    	let svg_levels = [
    		{ "data-carbon-icon": "CaretRight16" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ width: "16" },
    		{ height: "16" },
    		{ class: /*className*/ ctx[0] },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ style: /*style*/ ctx[3] },
    		{ id: /*id*/ ctx[1] },
    		/*attributes*/ ctx[4]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(path, "d", "M12 8L22 16 12 24z");
    			add_location(path, file$4, 42, 2, 1032);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$4, 23, 0, 691);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(svg, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[12], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[13], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[14], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[15], false, false, false),
    					listen_dev(svg, "keyup", /*keyup_handler*/ ctx[16], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*title*/ 4)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ "data-carbon-icon": "CaretRight16" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ width: "16" },
    				{ height: "16" },
    				(!current || dirty & /*className*/ 1) && { class: /*className*/ ctx[0] },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				(!current || dirty & /*style*/ 8) && { style: /*style*/ ctx[3] },
    				(!current || dirty & /*id*/ 2) && { id: /*id*/ ctx[1] },
    				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let ariaLabelledBy;
    	let labelled;
    	let attributes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CaretRight16', slots, ['default']);
    	let { class: className = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { tabindex = undefined } = $$props;
    	let { focusable = false } = $$props;
    	let { title = undefined } = $$props;
    	let { style = undefined } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
    		if ('id' in $$new_props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$new_props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$new_props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$new_props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		id,
    		tabindex,
    		focusable,
    		title,
    		style,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		attributes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
    		if ('id' in $$props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('labelled' in $$props) $$invalidate(7, labelled = $$new_props.labelled);
    		if ('ariaLabelledBy' in $$props) $$invalidate(8, ariaLabelledBy = $$new_props.ariaLabelledBy);
    		if ('ariaLabel' in $$props) $$invalidate(9, ariaLabel = $$new_props.ariaLabel);
    		if ('attributes' in $$props) $$invalidate(4, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(9, ariaLabel = $$props["aria-label"]);
    		$$invalidate(8, ariaLabelledBy = $$props["aria-labelledby"]);

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, title*/ 772) {
    			$$invalidate(7, labelled = ariaLabel || ariaLabelledBy || title);
    		}

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, labelled, tabindex, focusable*/ 992) {
    			$$invalidate(4, attributes = {
    				"aria-label": ariaLabel,
    				"aria-labelledby": ariaLabelledBy,
    				"aria-hidden": labelled ? undefined : true,
    				role: labelled ? "img" : undefined,
    				focusable: tabindex === "0" ? true : focusable,
    				tabindex
    			});
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		className,
    		id,
    		title,
    		style,
    		attributes,
    		tabindex,
    		focusable,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keyup_handler,
    		keydown_handler
    	];
    }

    class CaretRight16 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			class: 0,
    			id: 1,
    			tabindex: 5,
    			focusable: 6,
    			title: 2,
    			style: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CaretRight16",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get class() {
    		throw new Error("<CaretRight16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CaretRight16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<CaretRight16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<CaretRight16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<CaretRight16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<CaretRight16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focusable() {
    		throw new Error("<CaretRight16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set focusable(value) {
    		throw new Error("<CaretRight16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CaretRight16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CaretRight16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<CaretRight16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<CaretRight16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var CaretRight16$1 = CaretRight16;

    /* node_modules/carbon-components-svelte/src/ContextMenu/ContextMenuOption.svelte generated by Svelte v3.46.4 */
    const file$3 = "node_modules/carbon-components-svelte/src/ContextMenu/ContextMenuOption.svelte";
    const get_shortcutText_slot_changes = dirty => ({});
    const get_shortcutText_slot_context = ctx => ({});
    const get_labelText_slot_changes_1 = dirty => ({});
    const get_labelText_slot_context_1 = ctx => ({});
    const get_labelText_slot_changes = dirty => ({});
    const get_labelText_slot_context = ctx => ({});

    // (264:2) {:else}
    function create_else_block(ctx) {
    	let div1;
    	let t0;
    	let span;
    	let t1;
    	let div0;
    	let current;
    	let if_block = /*indented*/ ctx[2] && create_if_block_2(ctx);
    	const labelText_slot_template = /*#slots*/ ctx[23].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[31], get_labelText_slot_context_1);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block_2(ctx);
    	const shortcutText_slot_template = /*#slots*/ ctx[23].shortcutText;
    	const shortcutText_slot = create_slot(shortcutText_slot_template, ctx, /*$$scope*/ ctx[31], get_shortcutText_slot_context);
    	const shortcutText_slot_or_fallback = shortcutText_slot || fallback_block_1(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			span = element("span");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			t1 = space();
    			div0 = element("div");
    			if (shortcutText_slot_or_fallback) shortcutText_slot_or_fallback.c();
    			attr_dev(span, "title", /*labelText*/ ctx[6]);
    			toggle_class(span, "bx--menu-option__label", true);
    			add_location(span, file$3, 273, 6, 7260);
    			toggle_class(div0, "bx--menu-option__info", true);
    			add_location(div0, file$3, 276, 6, 7395);
    			toggle_class(div1, "bx--menu-option__content", true);
    			toggle_class(div1, "bx--menu-option__content--disabled", /*disabled*/ ctx[5]);
    			add_location(div1, file$3, 264, 4, 6993);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, span);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(span, null);
    			}

    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			if (shortcutText_slot_or_fallback) {
    				shortcutText_slot_or_fallback.m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*indented*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*indented*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[31], dirty, get_labelText_slot_changes_1),
    						get_labelText_slot_context_1
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 64)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*labelText*/ 64) {
    				attr_dev(span, "title", /*labelText*/ ctx[6]);
    			}

    			if (shortcutText_slot) {
    				if (shortcutText_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						shortcutText_slot,
    						shortcutText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(shortcutText_slot_template, /*$$scope*/ ctx[31], dirty, get_shortcutText_slot_changes),
    						get_shortcutText_slot_context
    					);
    				}
    			} else {
    				if (shortcutText_slot_or_fallback && shortcutText_slot_or_fallback.p && (!current || dirty[0] & /*shortcutText*/ 128)) {
    					shortcutText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div1, "bx--menu-option__content--disabled", /*disabled*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(labelText_slot_or_fallback, local);
    			transition_in(shortcutText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(labelText_slot_or_fallback, local);
    			transition_out(shortcutText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    			if (shortcutText_slot_or_fallback) shortcutText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(264:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (241:2) {#if subOptions}
    function create_if_block$2(ctx) {
    	let div1;
    	let t0;
    	let span;
    	let t1;
    	let div0;
    	let caretright16;
    	let t2;
    	let contextmenu;
    	let current;
    	let if_block = /*indented*/ ctx[2] && create_if_block_1(ctx);
    	const labelText_slot_template = /*#slots*/ ctx[23].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[31], get_labelText_slot_context);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block$2(ctx);
    	caretright16 = new CaretRight16$1({ $$inline: true });

    	contextmenu = new ContextMenu$1({
    			props: {
    				open: /*submenuOpen*/ ctx[9],
    				x: /*submenuPosition*/ ctx[16][0],
    				y: /*submenuPosition*/ ctx[16][1],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			span = element("span");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			t1 = space();
    			div0 = element("div");
    			create_component(caretright16.$$.fragment);
    			t2 = space();
    			create_component(contextmenu.$$.fragment);
    			attr_dev(span, "title", /*labelText*/ ctx[6]);
    			toggle_class(span, "bx--menu-option__label", true);
    			add_location(span, file$3, 250, 6, 6621);
    			toggle_class(div0, "bx--menu-option__info", true);
    			add_location(div0, file$3, 253, 6, 6756);
    			toggle_class(div1, "bx--menu-option__content", true);
    			toggle_class(div1, "bx--menu-option__content--disabled", /*disabled*/ ctx[5]);
    			add_location(div1, file$3, 241, 4, 6354);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, span);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(span, null);
    			}

    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(caretright16, div0, null);
    			insert_dev(target, t2, anchor);
    			mount_component(contextmenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*indented*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*indented*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[31], dirty, get_labelText_slot_changes),
    						get_labelText_slot_context
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 64)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*labelText*/ 64) {
    				attr_dev(span, "title", /*labelText*/ ctx[6]);
    			}

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div1, "bx--menu-option__content--disabled", /*disabled*/ ctx[5]);
    			}

    			const contextmenu_changes = {};
    			if (dirty[0] & /*submenuOpen*/ 512) contextmenu_changes.open = /*submenuOpen*/ ctx[9];
    			if (dirty[0] & /*submenuPosition*/ 65536) contextmenu_changes.x = /*submenuPosition*/ ctx[16][0];
    			if (dirty[0] & /*submenuPosition*/ 65536) contextmenu_changes.y = /*submenuPosition*/ ctx[16][1];

    			if (dirty[1] & /*$$scope*/ 1) {
    				contextmenu_changes.$$scope = { dirty, ctx };
    			}

    			contextmenu.$set(contextmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(labelText_slot_or_fallback, local);
    			transition_in(caretright16.$$.fragment, local);
    			transition_in(contextmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(labelText_slot_or_fallback, local);
    			transition_out(caretright16.$$.fragment, local);
    			transition_out(contextmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    			destroy_component(caretright16);
    			if (detaching) detach_dev(t2);
    			destroy_component(contextmenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(241:2) {#if subOptions}",
    		ctx
    	});

    	return block;
    }

    // (269:6) {#if indented}
    function create_if_block_2(ctx) {
    	let div;
    	let switch_instance;
    	let current;
    	var switch_value = /*icon*/ ctx[3];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			toggle_class(div, "bx--menu-option__icon", true);
    			add_location(div, file$3, 269, 8, 7139);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*icon*/ ctx[3])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(269:6) {#if indented}",
    		ctx
    	});

    	return block;
    }

    // (275:31) {labelText}
    function fallback_block_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[6]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 64) set_data_dev(t, /*labelText*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_2.name,
    		type: "fallback",
    		source: "(275:31) {labelText}",
    		ctx
    	});

    	return block;
    }

    // (278:34) {shortcutText}
    function fallback_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*shortcutText*/ ctx[7]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*shortcutText*/ 128) set_data_dev(t, /*shortcutText*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(278:34) {shortcutText}",
    		ctx
    	});

    	return block;
    }

    // (246:6) {#if indented}
    function create_if_block_1(ctx) {
    	let div;
    	let switch_instance;
    	let current;
    	var switch_value = /*icon*/ ctx[3];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			toggle_class(div, "bx--menu-option__icon", true);
    			add_location(div, file$3, 246, 8, 6500);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*icon*/ ctx[3])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(246:6) {#if indented}",
    		ctx
    	});

    	return block;
    }

    // (252:31) {labelText}
    function fallback_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[6]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 64) set_data_dev(t, /*labelText*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(252:31) {labelText}",
    		ctx
    	});

    	return block;
    }

    // (257:4) <ContextMenu       open="{submenuOpen}"       x="{submenuPosition[0]}"       y="{submenuPosition[1]}"     >
    function create_default_slot$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[23].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[31], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[31], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(257:4) <ContextMenu       open=\\\"{submenuOpen}\\\"       x=\\\"{submenuPosition[0]}\\\"       y=\\\"{submenuPosition[1]}\\\"     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let li;
    	let current_block_type_index;
    	let if_block;
    	let li_aria_disabled_value;
    	let li_aria_haspopup_value;
    	let li_aria_expanded_value;
    	let li_aria_checked_value;
    	let li_data_nested_value;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block$2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*subOptions*/ ctx[17]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let li_levels = [
    		{ role: /*role*/ ctx[15] },
    		{ tabindex: "-1" },
    		{
    			"aria-disabled": li_aria_disabled_value = !/*subOptions*/ ctx[17] && /*disabled*/ ctx[5]
    		},
    		{
    			"aria-haspopup": li_aria_haspopup_value = /*subOptions*/ ctx[17] ? true : undefined
    		},
    		{
    			"aria-expanded": li_aria_expanded_value = /*subOptions*/ ctx[17]
    			? /*submenuOpen*/ ctx[9]
    			: undefined
    		},
    		{ indented: /*indented*/ ctx[2] },
    		{
    			"aria-checked": li_aria_checked_value = /*isSelectable*/ ctx[11] || /*isRadio*/ ctx[10]
    			? /*selected*/ ctx[0]
    			: undefined
    		},
    		{
    			"data-nested": li_data_nested_value = /*ref*/ ctx[1] && /*ref*/ ctx[1].closest('.bx--menu').getAttribute('data-level') === '2'
    		},
    		{ "data-sub": /*subOptions*/ ctx[17] },
    		{ "data-id": /*id*/ ctx[8] },
    		/*$$restProps*/ ctx[19]
    	];

    	let li_data = {};

    	for (let i = 0; i < li_levels.length; i += 1) {
    		li_data = assign(li_data, li_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			if_block.c();
    			set_attributes(li, li_data);
    			toggle_class(li, "bx--menu-option", true);
    			toggle_class(li, "bx--menu-option--disabled", true);
    			toggle_class(li, "bx--menu-option--active", /*subOptions*/ ctx[17] && /*submenuOpen*/ ctx[9]);
    			toggle_class(li, "bx--menu-option--danger", !/*subOptions*/ ctx[17] && /*kind*/ ctx[4] === 'danger');
    			add_location(li, file$3, 168, 0, 4342);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if_blocks[current_block_type_index].m(li, null);
    			/*li_binding*/ ctx[27](li);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(li, "keydown", /*keydown_handler*/ ctx[24], false, false, false),
    					listen_dev(li, "keydown", /*keydown_handler_1*/ ctx[28], false, false, false),
    					listen_dev(li, "mouseenter", /*mouseenter_handler*/ ctx[25], false, false, false),
    					listen_dev(li, "mouseenter", /*mouseenter_handler_1*/ ctx[29], false, false, false),
    					listen_dev(li, "mouseleave", /*mouseleave_handler*/ ctx[26], false, false, false),
    					listen_dev(li, "mouseleave", /*mouseleave_handler_1*/ ctx[30], false, false, false),
    					listen_dev(li, "click", /*handleClick*/ ctx[18], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(li, null);
    			}

    			set_attributes(li, li_data = get_spread_update(li_levels, [
    				(!current || dirty[0] & /*role*/ 32768) && { role: /*role*/ ctx[15] },
    				{ tabindex: "-1" },
    				(!current || dirty[0] & /*subOptions, disabled*/ 131104 && li_aria_disabled_value !== (li_aria_disabled_value = !/*subOptions*/ ctx[17] && /*disabled*/ ctx[5])) && { "aria-disabled": li_aria_disabled_value },
    				(!current || dirty[0] & /*subOptions*/ 131072 && li_aria_haspopup_value !== (li_aria_haspopup_value = /*subOptions*/ ctx[17] ? true : undefined)) && { "aria-haspopup": li_aria_haspopup_value },
    				(!current || dirty[0] & /*subOptions, submenuOpen*/ 131584 && li_aria_expanded_value !== (li_aria_expanded_value = /*subOptions*/ ctx[17]
    				? /*submenuOpen*/ ctx[9]
    				: undefined)) && { "aria-expanded": li_aria_expanded_value },
    				(!current || dirty[0] & /*indented*/ 4) && { indented: /*indented*/ ctx[2] },
    				(!current || dirty[0] & /*isSelectable, isRadio, selected*/ 3073 && li_aria_checked_value !== (li_aria_checked_value = /*isSelectable*/ ctx[11] || /*isRadio*/ ctx[10]
    				? /*selected*/ ctx[0]
    				: undefined)) && { "aria-checked": li_aria_checked_value },
    				(!current || dirty[0] & /*ref*/ 2 && li_data_nested_value !== (li_data_nested_value = /*ref*/ ctx[1] && /*ref*/ ctx[1].closest('.bx--menu').getAttribute('data-level') === '2')) && { "data-nested": li_data_nested_value },
    				(!current || dirty[0] & /*subOptions*/ 131072) && { "data-sub": /*subOptions*/ ctx[17] },
    				(!current || dirty[0] & /*id*/ 256) && { "data-id": /*id*/ ctx[8] },
    				dirty[0] & /*$$restProps*/ 524288 && /*$$restProps*/ ctx[19]
    			]));

    			toggle_class(li, "bx--menu-option", true);
    			toggle_class(li, "bx--menu-option--disabled", true);
    			toggle_class(li, "bx--menu-option--active", /*subOptions*/ ctx[17] && /*submenuOpen*/ ctx[9]);
    			toggle_class(li, "bx--menu-option--danger", !/*subOptions*/ ctx[17] && /*kind*/ ctx[4] === 'danger');
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if_blocks[current_block_type_index].d();
    			/*li_binding*/ ctx[27](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const moderate01 = 150;

    function instance$3($$self, $$props, $$invalidate) {
    	let isSelectable;
    	let isRadio;
    	let subOptions;

    	const omit_props_names = [
    		"kind","disabled","indented","icon","labelText","selected","selectable","shortcutText","id","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContextMenuOption', slots, ['labelText','default','shortcutText']);
    	const $$slots = compute_slots(slots);
    	let { kind = "default" } = $$props;
    	let { disabled = false } = $$props;
    	let { indented = false } = $$props;
    	let { icon = undefined } = $$props;
    	let { labelText = "" } = $$props;
    	let { selected = false } = $$props;
    	let { selectable = false } = $$props;
    	let { shortcutText = "" } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { ref = null } = $$props;
    	const dispatch = createEventDispatcher();
    	const ctx = getContext("ContextMenu");
    	const ctxGroup = getContext("ContextMenuGroup");
    	const ctxRadioGroup = getContext("ContextMenuRadioGroup");
    	let unsubCurrentIds = undefined;
    	let unsubCurrentId = undefined;
    	let timeoutHover = undefined;
    	let rootMenuPosition = [0, 0];
    	let focusIndex = 0;
    	let options = [];
    	let role = "menuitem";
    	let submenuOpen = false;
    	let submenuPosition = [0, 0];
    	let menuOffsetX = 0;

    	const unsubPosition = ctx.position.subscribe(position => {
    		$$invalidate(21, rootMenuPosition = position);
    	});

    	const unsubMenuOffsetX = ctx.menuOffsetX.subscribe(_menuOffsetX => {
    		$$invalidate(22, menuOffsetX = _menuOffsetX);
    	});

    	function handleClick(opts = {}) {
    		if (disabled) return ctx.close();
    		if (subOptions) return;

    		if (!!ctxGroup) {
    			ctxGroup.toggleOption({ id });
    		} else if (!!ctxRadioGroup) {
    			if (opts.fromKeyboard) {
    				ctxRadioGroup.setOption({ id: opts.id });
    			} else {
    				ctxRadioGroup.setOption({ id });
    			}
    		} else {
    			$$invalidate(0, selected = !selected);
    		}

    		ctx.close();
    		dispatch("click");
    	}

    	onMount(() => {
    		if (selected === true) $$invalidate(20, selectable = true);

    		if (ctxGroup) {
    			unsubCurrentIds = ctxGroup.currentIds.subscribe(_currentIds => {
    				$$invalidate(0, selected = _currentIds.includes(id));
    			});
    		}

    		if (ctxRadioGroup) {
    			unsubCurrentId = ctxRadioGroup.currentId.subscribe(_id => {
    				$$invalidate(0, selected = id === _id);
    			});
    		}

    		return () => {
    			unsubPosition();
    			unsubMenuOffsetX();
    			if (unsubCurrentIds) unsubCurrentIds();
    			if (unsubCurrentId) unsubCurrentId();
    			if (typeof timeoutHover === "number") clearTimeout(timeoutHover);
    		};
    	});

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function li_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	const keydown_handler_1 = async ({ key, target }) => {
    		if (subOptions && (key === 'ArrowRight' || key === ' ' || key === 'Enter')) {
    			$$invalidate(9, submenuOpen = true);
    			await tick();
    			$$invalidate(14, options = [...ref.querySelectorAll('li[tabindex]')]);
    			if (options[focusIndex]) options[focusIndex].focus();
    			return;
    		}

    		if (submenuOpen) {
    			if (key === 'ArrowLeft') {
    				$$invalidate(9, submenuOpen = false);
    				$$invalidate(13, focusIndex = 0);
    				return;
    			}

    			if (key === 'ArrowDown') {
    				if (focusIndex < options.length - 1) $$invalidate(13, focusIndex++, focusIndex);
    			} else if (key === 'ArrowUp') {
    				if (focusIndex === -1) {
    					$$invalidate(13, focusIndex = options.length - 1);
    				} else {
    					if (focusIndex > 0) $$invalidate(13, focusIndex--, focusIndex);
    				}
    			}

    			if (options[focusIndex]) options[focusIndex].focus();
    		}

    		if (key === ' ' || key === 'Enter') {
    			handleClick({
    				fromKeyboard: true,
    				id: target.getAttribute('data-id')
    			});
    		}
    	};

    	const mouseenter_handler_1 = () => {
    		if (subOptions) {
    			$$invalidate(12, timeoutHover = setTimeout(
    				() => {
    					$$invalidate(9, submenuOpen = true);
    				},
    				moderate01
    			));
    		}
    	};

    	const mouseleave_handler_1 = e => {
    		if (subOptions) {
    			if (typeof timeoutHover === 'number') clearTimeout(timeoutHover);
    			$$invalidate(9, submenuOpen = false);
    		}
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('kind' in $$new_props) $$invalidate(4, kind = $$new_props.kind);
    		if ('disabled' in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('indented' in $$new_props) $$invalidate(2, indented = $$new_props.indented);
    		if ('icon' in $$new_props) $$invalidate(3, icon = $$new_props.icon);
    		if ('labelText' in $$new_props) $$invalidate(6, labelText = $$new_props.labelText);
    		if ('selected' in $$new_props) $$invalidate(0, selected = $$new_props.selected);
    		if ('selectable' in $$new_props) $$invalidate(20, selectable = $$new_props.selectable);
    		if ('shortcutText' in $$new_props) $$invalidate(7, shortcutText = $$new_props.shortcutText);
    		if ('id' in $$new_props) $$invalidate(8, id = $$new_props.id);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(31, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		kind,
    		disabled,
    		indented,
    		icon,
    		labelText,
    		selected,
    		selectable,
    		shortcutText,
    		id,
    		ref,
    		onMount,
    		getContext,
    		createEventDispatcher,
    		tick,
    		ContextMenu: ContextMenu$1,
    		Checkmark16: Checkmark16$1,
    		CaretRight16: CaretRight16$1,
    		dispatch,
    		ctx,
    		ctxGroup,
    		ctxRadioGroup,
    		moderate01,
    		unsubCurrentIds,
    		unsubCurrentId,
    		timeoutHover,
    		rootMenuPosition,
    		focusIndex,
    		options,
    		role,
    		submenuOpen,
    		submenuPosition,
    		menuOffsetX,
    		unsubPosition,
    		unsubMenuOffsetX,
    		handleClick,
    		isRadio,
    		isSelectable,
    		subOptions
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('kind' in $$props) $$invalidate(4, kind = $$new_props.kind);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('indented' in $$props) $$invalidate(2, indented = $$new_props.indented);
    		if ('icon' in $$props) $$invalidate(3, icon = $$new_props.icon);
    		if ('labelText' in $$props) $$invalidate(6, labelText = $$new_props.labelText);
    		if ('selected' in $$props) $$invalidate(0, selected = $$new_props.selected);
    		if ('selectable' in $$props) $$invalidate(20, selectable = $$new_props.selectable);
    		if ('shortcutText' in $$props) $$invalidate(7, shortcutText = $$new_props.shortcutText);
    		if ('id' in $$props) $$invalidate(8, id = $$new_props.id);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    		if ('unsubCurrentIds' in $$props) unsubCurrentIds = $$new_props.unsubCurrentIds;
    		if ('unsubCurrentId' in $$props) unsubCurrentId = $$new_props.unsubCurrentId;
    		if ('timeoutHover' in $$props) $$invalidate(12, timeoutHover = $$new_props.timeoutHover);
    		if ('rootMenuPosition' in $$props) $$invalidate(21, rootMenuPosition = $$new_props.rootMenuPosition);
    		if ('focusIndex' in $$props) $$invalidate(13, focusIndex = $$new_props.focusIndex);
    		if ('options' in $$props) $$invalidate(14, options = $$new_props.options);
    		if ('role' in $$props) $$invalidate(15, role = $$new_props.role);
    		if ('submenuOpen' in $$props) $$invalidate(9, submenuOpen = $$new_props.submenuOpen);
    		if ('submenuPosition' in $$props) $$invalidate(16, submenuPosition = $$new_props.submenuPosition);
    		if ('menuOffsetX' in $$props) $$invalidate(22, menuOffsetX = $$new_props.menuOffsetX);
    		if ('isRadio' in $$props) $$invalidate(10, isRadio = $$new_props.isRadio);
    		if ('isSelectable' in $$props) $$invalidate(11, isSelectable = $$new_props.isSelectable);
    		if ('subOptions' in $$props) $$invalidate(17, subOptions = $$new_props.subOptions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*selectable*/ 1048576) {
    			$$invalidate(11, isSelectable = !!ctxGroup || selectable);
    		}

    		if ($$self.$$.dirty[0] & /*submenuOpen*/ 512) {
    			ctx.setPopup(submenuOpen);
    		}

    		if ($$self.$$.dirty[0] & /*submenuOpen, ref, rootMenuPosition, menuOffsetX*/ 6291970) {
    			if (submenuOpen) {
    				const { width, y } = ref.getBoundingClientRect();
    				let x = rootMenuPosition[0] + width;

    				if (window.innerWidth - menuOffsetX < width) {
    					x = rootMenuPosition[0] - width;
    				}

    				$$invalidate(16, submenuPosition = [x, y]);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*isSelectable, selected, id, isRadio*/ 3329) {
    			{
    				if (isSelectable) {
    					$$invalidate(2, indented = true);
    					$$invalidate(15, role = "menuitemcheckbox");

    					if (selected) {
    						if (ctxGroup) ctxGroup.addOption({ id });
    						$$invalidate(3, icon = Checkmark16$1);
    					} else {
    						$$invalidate(3, icon = undefined);
    					}
    				}

    				if (isRadio) {
    					$$invalidate(2, indented = true);
    					$$invalidate(15, role = "menuitemradio");
    					ctxRadioGroup.addOption({ id });

    					if (selected) {
    						if (ctxRadioGroup) ctxRadioGroup.setOption({ id });
    						$$invalidate(3, icon = Checkmark16$1);
    					} else {
    						$$invalidate(3, icon = undefined);
    					}
    				}
    			}
    		}
    	};

    	$$invalidate(10, isRadio = !!ctxRadioGroup);
    	$$invalidate(17, subOptions = $$slots.default);

    	return [
    		selected,
    		ref,
    		indented,
    		icon,
    		kind,
    		disabled,
    		labelText,
    		shortcutText,
    		id,
    		submenuOpen,
    		isRadio,
    		isSelectable,
    		timeoutHover,
    		focusIndex,
    		options,
    		role,
    		submenuPosition,
    		subOptions,
    		handleClick,
    		$$restProps,
    		selectable,
    		rootMenuPosition,
    		menuOffsetX,
    		slots,
    		keydown_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		li_binding,
    		keydown_handler_1,
    		mouseenter_handler_1,
    		mouseleave_handler_1,
    		$$scope
    	];
    }

    class ContextMenuOption extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$3,
    			create_fragment$3,
    			safe_not_equal,
    			{
    				kind: 4,
    				disabled: 5,
    				indented: 2,
    				icon: 3,
    				labelText: 6,
    				selected: 0,
    				selectable: 20,
    				shortcutText: 7,
    				id: 8,
    				ref: 1
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContextMenuOption",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get kind() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set kind(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get indented() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set indented(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectable() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectable(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shortcutText() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shortcutText(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<ContextMenuOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<ContextMenuOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ContextMenuOption$1 = ContextMenuOption;

    /* node_modules/carbon-icons-svelte/lib/CopyFile16/CopyFile16.svelte generated by Svelte v3.46.4 */

    const file$2 = "node_modules/carbon-icons-svelte/lib/CopyFile16/CopyFile16.svelte";

    // (40:4) {#if title}
    function create_if_block$1(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			add_location(title_1, file$2, 40, 6, 1301);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(40:4) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (39:8)      
    function fallback_block$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*title*/ ctx[2] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*title*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(39:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

    	let svg_levels = [
    		{ "data-carbon-icon": "CopyFile16" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ width: "16" },
    		{ height: "16" },
    		{ class: /*className*/ ctx[0] },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ style: /*style*/ ctx[3] },
    		{ id: /*id*/ ctx[1] },
    		/*attributes*/ ctx[4]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(path0, "d", "M27.4,14.7l-6.1-6.1C21,8.2,20.5,8,20,8h-8c-1.1,0-2,0.9-2,2v18c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V16.1\tC28,15.6,27.8,15.1,27.4,14.7z M20,10l5.9,6H20V10z M12,28V10h6v6c0,1.1,0.9,2,2,2h6l0,10H12z");
    			add_location(path0, file$2, 37, 2, 1005);
    			attr_dev(path1, "d", "M6,18H4V4c0-1.1,0.9-2,2-2h14v2H6V18z");
    			add_location(path1, file$2, 37, 212, 1215);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$2, 23, 0, 690);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(svg, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[12], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[13], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[14], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[15], false, false, false),
    					listen_dev(svg, "keyup", /*keyup_handler*/ ctx[16], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*title*/ 4)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ "data-carbon-icon": "CopyFile16" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ width: "16" },
    				{ height: "16" },
    				(!current || dirty & /*className*/ 1) && { class: /*className*/ ctx[0] },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				(!current || dirty & /*style*/ 8) && { style: /*style*/ ctx[3] },
    				(!current || dirty & /*id*/ 2) && { id: /*id*/ ctx[1] },
    				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let ariaLabelledBy;
    	let labelled;
    	let attributes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CopyFile16', slots, ['default']);
    	let { class: className = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { tabindex = undefined } = $$props;
    	let { focusable = false } = $$props;
    	let { title = undefined } = $$props;
    	let { style = undefined } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
    		if ('id' in $$new_props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$new_props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$new_props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$new_props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		id,
    		tabindex,
    		focusable,
    		title,
    		style,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		attributes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
    		if ('id' in $$props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('labelled' in $$props) $$invalidate(7, labelled = $$new_props.labelled);
    		if ('ariaLabelledBy' in $$props) $$invalidate(8, ariaLabelledBy = $$new_props.ariaLabelledBy);
    		if ('ariaLabel' in $$props) $$invalidate(9, ariaLabel = $$new_props.ariaLabel);
    		if ('attributes' in $$props) $$invalidate(4, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(9, ariaLabel = $$props['aria-label']);
    		$$invalidate(8, ariaLabelledBy = $$props['aria-labelledby']);

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, title*/ 772) {
    			$$invalidate(7, labelled = ariaLabel || ariaLabelledBy || title);
    		}

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, labelled, tabindex, focusable*/ 992) {
    			$$invalidate(4, attributes = {
    				'aria-label': ariaLabel,
    				'aria-labelledby': ariaLabelledBy,
    				'aria-hidden': labelled ? undefined : true,
    				role: labelled ? 'img' : undefined,
    				focusable: tabindex === '0' ? true : focusable,
    				tabindex
    			});
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		className,
    		id,
    		title,
    		style,
    		attributes,
    		tabindex,
    		focusable,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keyup_handler,
    		keydown_handler
    	];
    }

    class CopyFile16 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			class: 0,
    			id: 1,
    			tabindex: 5,
    			focusable: 6,
    			title: 2,
    			style: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CopyFile16",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get class() {
    		throw new Error("<CopyFile16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CopyFile16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<CopyFile16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<CopyFile16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<CopyFile16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<CopyFile16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focusable() {
    		throw new Error("<CopyFile16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set focusable(value) {
    		throw new Error("<CopyFile16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CopyFile16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CopyFile16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<CopyFile16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<CopyFile16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var CopyFile16$1 = CopyFile16;

    /* node_modules/carbon-icons-svelte/lib/Cut16/Cut16.svelte generated by Svelte v3.46.4 */

    const file$1 = "node_modules/carbon-icons-svelte/lib/Cut16/Cut16.svelte";

    // (40:4) {#if title}
    function create_if_block(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			add_location(title_1, file$1, 40, 6, 1485);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:4) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (39:8)      
    function fallback_block(ctx) {
    	let if_block_anchor;
    	let if_block = /*title*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*title*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(39:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	let svg_levels = [
    		{ "data-carbon-icon": "Cut16" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ width: "16" },
    		{ height: "16" },
    		{ class: /*className*/ ctx[0] },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ style: /*style*/ ctx[3] },
    		{ id: /*id*/ ctx[1] },
    		/*attributes*/ ctx[4]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(path, "d", "M26.5,19.63,20.24,16l6.26-3.63a5,5,0,0,0-1.21-9.2A5.19,5.19,0,0,0,24,3a5,5,0,0,0-4.33,7.53,5,5,0,0,0,2.39,2.1l-3.82,2.21L4,6.6,3,8.34,16.24,16,3,23.68l1,1.74,14.24-8.26,3.82,2.21a5,5,0,0,0-2.39,2.1A5,5,0,0,0,24,29a5.19,5.19,0,0,0,1.29-.17,5,5,0,0,0,1.21-9.2ZM21.4,9.53a3,3,0,0,1,1.1-4.12,3,3,0,0,1,4.1,1.11,3,3,0,0,1-1.1,4.11h0A3,3,0,0,1,21.4,9.53Zm5.2,16a3,3,0,0,1-4.1,1.11,3,3,0,0,1-1.1-4.12,3,3,0,0,1,4.1-1.1h0A3,3,0,0,1,26.6,25.48Z");
    			add_location(path, file$1, 37, 2, 1000);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$1, 23, 0, 690);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(svg, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[12], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[13], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[14], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[15], false, false, false),
    					listen_dev(svg, "keyup", /*keyup_handler*/ ctx[16], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*title*/ 4)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ "data-carbon-icon": "Cut16" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ width: "16" },
    				{ height: "16" },
    				(!current || dirty & /*className*/ 1) && { class: /*className*/ ctx[0] },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				(!current || dirty & /*style*/ 8) && { style: /*style*/ ctx[3] },
    				(!current || dirty & /*id*/ 2) && { id: /*id*/ ctx[1] },
    				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let ariaLabelledBy;
    	let labelled;
    	let attributes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cut16', slots, ['default']);
    	let { class: className = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { tabindex = undefined } = $$props;
    	let { focusable = false } = $$props;
    	let { title = undefined } = $$props;
    	let { style = undefined } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
    		if ('id' in $$new_props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$new_props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$new_props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$new_props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		id,
    		tabindex,
    		focusable,
    		title,
    		style,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		attributes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
    		if ('id' in $$props) $$invalidate(1, id = $$new_props.id);
    		if ('tabindex' in $$props) $$invalidate(5, tabindex = $$new_props.tabindex);
    		if ('focusable' in $$props) $$invalidate(6, focusable = $$new_props.focusable);
    		if ('title' in $$props) $$invalidate(2, title = $$new_props.title);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('labelled' in $$props) $$invalidate(7, labelled = $$new_props.labelled);
    		if ('ariaLabelledBy' in $$props) $$invalidate(8, ariaLabelledBy = $$new_props.ariaLabelledBy);
    		if ('ariaLabel' in $$props) $$invalidate(9, ariaLabel = $$new_props.ariaLabel);
    		if ('attributes' in $$props) $$invalidate(4, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(9, ariaLabel = $$props['aria-label']);
    		$$invalidate(8, ariaLabelledBy = $$props['aria-labelledby']);

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, title*/ 772) {
    			$$invalidate(7, labelled = ariaLabel || ariaLabelledBy || title);
    		}

    		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, labelled, tabindex, focusable*/ 992) {
    			$$invalidate(4, attributes = {
    				'aria-label': ariaLabel,
    				'aria-labelledby': ariaLabelledBy,
    				'aria-hidden': labelled ? undefined : true,
    				role: labelled ? 'img' : undefined,
    				focusable: tabindex === '0' ? true : focusable,
    				tabindex
    			});
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		className,
    		id,
    		title,
    		style,
    		attributes,
    		tabindex,
    		focusable,
    		labelled,
    		ariaLabelledBy,
    		ariaLabel,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keyup_handler,
    		keydown_handler
    	];
    }

    class Cut16 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			class: 0,
    			id: 1,
    			tabindex: 5,
    			focusable: 6,
    			title: 2,
    			style: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cut16",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get class() {
    		throw new Error("<Cut16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Cut16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Cut16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Cut16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Cut16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Cut16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focusable() {
    		throw new Error("<Cut16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set focusable(value) {
    		throw new Error("<Cut16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Cut16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Cut16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Cut16>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Cut16>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Cut16$1 = Cut16;

    /* src/App.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    // (27:4) <ContextMenuGroup labelText="Export options" bind:selectedIds>
    function create_default_slot_3(ctx) {
    	let contextmenuoption0;
    	let t0;
    	let contextmenuoption1;
    	let t1;
    	let contextmenuoption2;
    	let current;

    	contextmenuoption0 = new ContextMenuOption$1({
    			props: { id: "pdf", labelText: "PDF" },
    			$$inline: true
    		});

    	contextmenuoption1 = new ContextMenuOption$1({
    			props: { id: "txt", labelText: "TXT" },
    			$$inline: true
    		});

    	contextmenuoption2 = new ContextMenuOption$1({
    			props: { id: "mp3", labelText: "MP3" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contextmenuoption0.$$.fragment);
    			t0 = space();
    			create_component(contextmenuoption1.$$.fragment);
    			t1 = space();
    			create_component(contextmenuoption2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contextmenuoption0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(contextmenuoption1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(contextmenuoption2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contextmenuoption0.$$.fragment, local);
    			transition_in(contextmenuoption1.$$.fragment, local);
    			transition_in(contextmenuoption2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contextmenuoption0.$$.fragment, local);
    			transition_out(contextmenuoption1.$$.fragment, local);
    			transition_out(contextmenuoption2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contextmenuoption0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(contextmenuoption1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(contextmenuoption2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(27:4) <ContextMenuGroup labelText=\\\"Export options\\\" bind:selectedIds>",
    		ctx
    	});

    	return block;
    }

    // (26:2) <ContextMenuOption indented labelText="Export as">
    function create_default_slot_2(ctx) {
    	let contextmenugroup;
    	let updating_selectedIds;
    	let current;

    	function contextmenugroup_selectedIds_binding(value) {
    		/*contextmenugroup_selectedIds_binding*/ ctx[1](value);
    	}

    	let contextmenugroup_props = {
    		labelText: "Export options",
    		$$slots: { default: [create_default_slot_3] },
    		$$scope: { ctx }
    	};

    	if (/*selectedIds*/ ctx[0] !== void 0) {
    		contextmenugroup_props.selectedIds = /*selectedIds*/ ctx[0];
    	}

    	contextmenugroup = new ContextMenuGroup$1({
    			props: contextmenugroup_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(contextmenugroup, 'selectedIds', contextmenugroup_selectedIds_binding));

    	const block = {
    		c: function create() {
    			create_component(contextmenugroup.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contextmenugroup, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contextmenugroup_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				contextmenugroup_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_selectedIds && dirty & /*selectedIds*/ 1) {
    				updating_selectedIds = true;
    				contextmenugroup_changes.selectedIds = /*selectedIds*/ ctx[0];
    				add_flush_callback(() => updating_selectedIds = false);
    			}

    			contextmenugroup.$set(contextmenugroup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contextmenugroup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contextmenugroup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contextmenugroup, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(26:2) <ContextMenuOption indented labelText=\\\"Export as\\\">",
    		ctx
    	});

    	return block;
    }

    // (36:2) <ContextMenuGroup labelText="Style options">
    function create_default_slot_1(ctx) {
    	let contextmenuoption0;
    	let t0;
    	let contextmenuoption1;
    	let t1;
    	let contextmenuoption2;
    	let current;

    	contextmenuoption0 = new ContextMenuOption$1({
    			props: {
    				id: "0",
    				labelText: "Font smoothing",
    				selected: true
    			},
    			$$inline: true
    		});

    	contextmenuoption1 = new ContextMenuOption$1({
    			props: { id: "1", labelText: "Reduce noise" },
    			$$inline: true
    		});

    	contextmenuoption2 = new ContextMenuOption$1({
    			props: { id: "2", labelText: "Auto-sharpen" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contextmenuoption0.$$.fragment);
    			t0 = space();
    			create_component(contextmenuoption1.$$.fragment);
    			t1 = space();
    			create_component(contextmenuoption2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contextmenuoption0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(contextmenuoption1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(contextmenuoption2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contextmenuoption0.$$.fragment, local);
    			transition_in(contextmenuoption1.$$.fragment, local);
    			transition_in(contextmenuoption2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contextmenuoption0.$$.fragment, local);
    			transition_out(contextmenuoption1.$$.fragment, local);
    			transition_out(contextmenuoption2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contextmenuoption0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(contextmenuoption1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(contextmenuoption2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(36:2) <ContextMenuGroup labelText=\\\"Style options\\\">",
    		ctx
    	});

    	return block;
    }

    // (17:0) <ContextMenu>
    function create_default_slot(ctx) {
    	let contextmenuoption0;
    	let t0;
    	let contextmenuoption1;
    	let t1;
    	let contextmenudivider0;
    	let t2;
    	let contextmenuoption2;
    	let t3;
    	let contextmenudivider1;
    	let t4;
    	let contextmenuoption3;
    	let t5;
    	let contextmenudivider2;
    	let t6;
    	let contextmenugroup;
    	let t7;
    	let contextmenudivider3;
    	let t8;
    	let contextmenuoption4;
    	let current;

    	contextmenuoption0 = new ContextMenuOption$1({
    			props: {
    				indented: true,
    				labelText: "Copy",
    				shortcutText: "\u0018C",
    				icon: CopyFile16$1
    			},
    			$$inline: true
    		});

    	contextmenuoption1 = new ContextMenuOption$1({
    			props: {
    				indented: true,
    				labelText: "Cut",
    				shortcutText: "\u0018X",
    				icon: Cut16$1
    			},
    			$$inline: true
    		});

    	contextmenudivider0 = new ContextMenuDivider$1({ $$inline: true });

    	contextmenuoption2 = new ContextMenuOption$1({
    			props: {
    				indented: true,
    				labelText: "Export as",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	contextmenudivider1 = new ContextMenuDivider$1({ $$inline: true });

    	contextmenuoption3 = new ContextMenuOption$1({
    			props: {
    				selectable: true,
    				labelText: "Remove metadata"
    			},
    			$$inline: true
    		});

    	contextmenudivider2 = new ContextMenuDivider$1({ $$inline: true });

    	contextmenugroup = new ContextMenuGroup$1({
    			props: {
    				labelText: "Style options",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	contextmenudivider3 = new ContextMenuDivider$1({ $$inline: true });

    	contextmenuoption4 = new ContextMenuOption$1({
    			props: {
    				indented: true,
    				kind: "danger",
    				labelText: "Delete"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contextmenuoption0.$$.fragment);
    			t0 = space();
    			create_component(contextmenuoption1.$$.fragment);
    			t1 = space();
    			create_component(contextmenudivider0.$$.fragment);
    			t2 = space();
    			create_component(contextmenuoption2.$$.fragment);
    			t3 = space();
    			create_component(contextmenudivider1.$$.fragment);
    			t4 = space();
    			create_component(contextmenuoption3.$$.fragment);
    			t5 = space();
    			create_component(contextmenudivider2.$$.fragment);
    			t6 = space();
    			create_component(contextmenugroup.$$.fragment);
    			t7 = space();
    			create_component(contextmenudivider3.$$.fragment);
    			t8 = space();
    			create_component(contextmenuoption4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contextmenuoption0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(contextmenuoption1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(contextmenudivider0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(contextmenuoption2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(contextmenudivider1, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(contextmenuoption3, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(contextmenudivider2, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(contextmenugroup, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(contextmenudivider3, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(contextmenuoption4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contextmenuoption2_changes = {};

    			if (dirty & /*$$scope, selectedIds*/ 5) {
    				contextmenuoption2_changes.$$scope = { dirty, ctx };
    			}

    			contextmenuoption2.$set(contextmenuoption2_changes);
    			const contextmenugroup_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				contextmenugroup_changes.$$scope = { dirty, ctx };
    			}

    			contextmenugroup.$set(contextmenugroup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contextmenuoption0.$$.fragment, local);
    			transition_in(contextmenuoption1.$$.fragment, local);
    			transition_in(contextmenudivider0.$$.fragment, local);
    			transition_in(contextmenuoption2.$$.fragment, local);
    			transition_in(contextmenudivider1.$$.fragment, local);
    			transition_in(contextmenuoption3.$$.fragment, local);
    			transition_in(contextmenudivider2.$$.fragment, local);
    			transition_in(contextmenugroup.$$.fragment, local);
    			transition_in(contextmenudivider3.$$.fragment, local);
    			transition_in(contextmenuoption4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contextmenuoption0.$$.fragment, local);
    			transition_out(contextmenuoption1.$$.fragment, local);
    			transition_out(contextmenudivider0.$$.fragment, local);
    			transition_out(contextmenuoption2.$$.fragment, local);
    			transition_out(contextmenudivider1.$$.fragment, local);
    			transition_out(contextmenuoption3.$$.fragment, local);
    			transition_out(contextmenudivider2.$$.fragment, local);
    			transition_out(contextmenugroup.$$.fragment, local);
    			transition_out(contextmenudivider3.$$.fragment, local);
    			transition_out(contextmenuoption4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contextmenuoption0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(contextmenuoption1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(contextmenudivider0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(contextmenuoption2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(contextmenudivider1, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(contextmenuoption3, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(contextmenudivider2, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(contextmenugroup, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(contextmenudivider3, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(contextmenuoption4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(17:0) <ContextMenu>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let contextmenu;
    	let t0;
    	let div;
    	let p;
    	let current;

    	contextmenu = new ContextMenu$1({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contextmenu.$$.fragment);
    			t0 = space();
    			div = element("div");
    			p = element("p");
    			p.textContent = "Right click anywhere on this page";
    			add_location(p, file, 45, 2, 1421);
    			attr_dev(div, "class", "svelte-1u1duwy");
    			add_location(div, file, 44, 0, 1413);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(contextmenu, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const contextmenu_changes = {};

    			if (dirty & /*$$scope, selectedIds*/ 5) {
    				contextmenu_changes.$$scope = { dirty, ctx };
    			}

    			contextmenu.$set(contextmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contextmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contextmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contextmenu, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let selectedIds = [];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function contextmenugroup_selectedIds_binding(value) {
    		selectedIds = value;
    		$$invalidate(0, selectedIds);
    	}

    	$$self.$capture_state = () => ({
    		ContextMenu: ContextMenu$1,
    		ContextMenuDivider: ContextMenuDivider$1,
    		ContextMenuGroup: ContextMenuGroup$1,
    		ContextMenuOption: ContextMenuOption$1,
    		CopyFile16: CopyFile16$1,
    		Cut16: Cut16$1,
    		selectedIds
    	});

    	$$self.$inject_state = $$props => {
    		if ('selectedIds' in $$props) $$invalidate(0, selectedIds = $$props.selectedIds);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedIds*/ 1) {
    			console.log("selectedIds", selectedIds);
    		}
    	};

    	return [selectedIds, contextmenugroup_selectedIds_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
