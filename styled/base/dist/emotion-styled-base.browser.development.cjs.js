'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var isPropValid = require('@emotion/is-prop-valid');
var react = require('@emotion/react');
var utils = require('@emotion/utils');
var serialize = require('@emotion/serialize');
var useInsertionEffectWithFallbacks = require('@emotion/use-insertion-effect-with-fallbacks');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var isPropValid__default = /*#__PURE__*/_interopDefault(isPropValid);

/* import type {
  ElementType,
  StatelessFunctionalComponent,
  AbstractComponent
} from 'react' */
/*
export type Interpolations = Array<any>

export type StyledElementType<Props> =
  | string
  | AbstractComponent<{ ...Props, className: string }, mixed>

export type StyledOptions = {
  label?: string,
  shouldForwardProp?: string => boolean,
  target?: string
}

export type StyledComponent<Props> = StatelessFunctionalComponent<Props> & {
  defaultProps: any,
  toString: () => string,
  withComponent: (
    nextTag: StyledElementType<Props>,
    nextOptions?: StyledOptions
  ) => StyledComponent<Props>
}

export type PrivateStyledComponent<Props> = StyledComponent<Props> & {
  __emotion_real: StyledComponent<Props>,
  __emotion_base: any,
  __emotion_styles: any,
  __emotion_forwardProp: any
}
*/

var testOmitPropsOnStringTag = isPropValid__default["default"];

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key
/*: string */
) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag
/*: ElementType */
) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag
/*: PrivateStyledComponent<any> */
, options
/*: StyledOptions | void */
, isReal
/*: boolean */
) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName
    /*: string */
    ) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};
/*
export type CreateStyledComponent = <Props>(
  ...args: Interpolations
) => StyledComponent<Props>

export type CreateStyled = {
  <Props>(
    tag: StyledElementType<Props>,
    options?: StyledOptions
  ): (...args: Interpolations) => StyledComponent<Props>,
  [key: string]: CreateStyledComponent,
  bind: () => CreateStyled
}
*/

var isDevelopment = true;

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  utils.registerStyles(cache, serialized, isStringTag);
  useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function () {
    return utils.insertStyles(cache, serialized, isStringTag);
  });

  return null;
};

var createStyled
/*: CreateStyled */
= function createStyled
/*: CreateStyled */
(tag
/*: any */
, options
/* ?: StyledOptions */
) {
  {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  /* return function<Props>(): PrivateStyledComponent<Props> { */

  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if (args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if (args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }

        styles.push(args[i], args[0][i]);
      }
    }

    var Styled
    /*: PrivateStyledComponent<Props> */
    = react.withEmotionCache(function (props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = React__namespace.useContext(react.ThemeContext);
      }

      if (typeof props.className === 'string') {
        className = utils.getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = serialize.serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;

      if (ref) {
        newProps.ref = ref;
      }

      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion, {
        cache: cache,
        serialized: serialized,
        isStringTag: typeof FinalTag === 'string'
      }), /*#__PURE__*/React__namespace.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && isDevelopment) {
          return 'NO_COMPONENT_SELECTOR';
        }

        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag
    /*: StyledElementType<Props> */
    , nextOptions
    /* ?: StyledOptions */
    ) {
      return createStyled(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

exports["default"] = createStyled;
